import { useLocation } from "react-router-dom";
import { useState } from "react";

const VideoAnalysisPage = () => {
  const { state } = useLocation();
  const { url } = state;
  const [cookies, setCookies] = useState("");

  const downloadVideo = async () => {
    const res = await fetch("https://getvideourl-aul5qp46xa-uc.a.run.app", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, cookies }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Download failed:", err);
      return;
    }

    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "video.mp4";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <div className="bg-mauve-800 h-screen w-full px-20 flex flex-col justify-center items-center gap-4">
      <span className="text-3xl text-stone-400">
        Paste your YouTube cookies:
      </span>
      <textarea
        className="w-full h-40 p-2 text-stone-400 bg-stone-700 block"
        placeholder="Paste cookies.txt contents here..."
        onChange={(e) => setCookies(e.target.value)}
      />
      <button
        className="w-120 h-20 cursor-pointer rounded-full mt-12 bg-stone-700 border-2 border-stone-400 text-3xl text-stone-400"
        onClick={downloadVideo}
      >
        Download
      </button>
    </div>
  );
};

export default VideoAnalysisPage;
