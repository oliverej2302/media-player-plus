import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import cors from "cors";
import { exec } from "child_process";
import { promisify } from "util";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

const execAsync = promisify(exec);
const corsHandler = cors({ origin: true });

setGlobalOptions({ maxInstances: 10 });

export const getVideoUrl = onRequest(
  { invoker: "public", memory: "512MiB" },
  (req, res) => {
    corsHandler(req, res, async () => {
      try {
        const { url, cookies } = req.body;
        logger.info("Getting download URL for: " + url);

        const cookiesPath = path.join(os.tmpdir(), `cookies_${Date.now()}.txt`);
        fs.writeFileSync(cookiesPath, cookies);

        const { stdout } = await execAsync(
          `${__dirname}/../bin/yt-dlp --js-runtimes deno:${__dirname}/../bin/deno-linux-bin --no-check-formats --cookies "${cookiesPath}" --get-url "${url}"`,
        );

        fs.unlinkSync(cookiesPath);
        res.json({ downloadUrl: stdout.trim() });
      } catch (error) {
        const err = error as any;
        logger.error("yt-dlp error:", err.message);
        res.status(500).json({ error: err.message });
      }
    });
  },
);
