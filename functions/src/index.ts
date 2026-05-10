import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import cors from "cors";
import { spawn } from "child_process";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

const corsHandler = cors({ origin: true });
setGlobalOptions({ maxInstances: 10 });

export const getVideoUrl = onRequest(
  { invoker: "public", memory: "1GiB", timeoutSeconds: 300 },
  (req, res) => {
    corsHandler(req, res, async () => {
      try {
        const { url, cookies } = req.body;
        logger.info("Downloading video for: " + url);

        const cookiesPath = path.join(os.tmpdir(), `cookies_${Date.now()}.txt`);
        const outputBase = path.join(os.tmpdir(), `video_${Date.now()}`);
        const outputPath = `${outputBase}.mp4`;
        fs.writeFileSync(cookiesPath, cookies);

        await new Promise<void>((resolve, reject) => {
          const proc = spawn(`${__dirname}/../bin/yt-dlp`, [
            `--js-runtimes`,
            `deno:${__dirname}/../bin/deno-linux-bin`,
            `--cookies`,
            cookiesPath,
            `-f`,
            `bv[ext=mp4]+ba/b[ext=mp4]/best`,
            `--merge-output-format`,
            `mp4`,
            `-o`,
            outputPath,
            url,
          ]);
          proc.stderr.on("data", (d) => logger.info(d.toString()));
          proc.on("close", (code) =>
            code === 0 ? resolve() : reject(new Error("yt-dlp failed")),
          );
        });

        fs.unlinkSync(cookiesPath);

        const baseName = path.basename(outputBase);
        const files = fs
          .readdirSync(os.tmpdir())
          .filter((f) => f.startsWith(baseName));
        const actualPath = path.join(os.tmpdir(), files[0]);

        res.setHeader("Content-Disposition", "attachment; filename=video.mp4");
        res.setHeader("Content-Type", "video/mp4");

        const stream = fs.createReadStream(actualPath);
        stream.pipe(res);
        stream.on("close", () => fs.unlinkSync(actualPath));
      } catch (error) {
        const err = error as any;
        logger.error("Error:", err.message);
        res.status(500).json({ error: err.message });
      }
    });
  },
);
