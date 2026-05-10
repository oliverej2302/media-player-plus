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
        className="w-full h-40 p-2 text-black"
        placeholder="Paste cookies.txt contents here..."
        onChange={(e) => setCookies(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded"
        onClick={downloadVideo}
      >
        Download
      </button>
      <span className="text-stone-400">{status}</span>
    </div>
  );
};

export default VideoAnalysisPage;
