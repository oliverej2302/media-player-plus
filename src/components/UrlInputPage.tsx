import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UrlInputPage = () => {
  const [urlInput, setUrlInput] = useState("");
  const urlRE = /(?<=[=/&])[a-zA-Z0-9_-]{11}(?=[=/&?#\n\r]|$)/;
  const videoID = urlInput.match(urlRE);
  const videoAnalysisPath = "./video";

  const navigate = useNavigate();

  return (
    <div className="bg-mauve-800 h-screen w-full px-20 flex flex-col justify-center items-center gap-4">
      <span className="text-3xl text-stone-400">Paste your YouTube URL:</span>
      <input
        className="w-full p-6 rounded-2xl bg-stone-700 border-2 border-stone-400 text-stone-400 text-4xl text-center z-1"
        type="text"
        value={urlInput}
        onChange={(e) => setUrlInput(e.target.value)}
      />
      <button
        className={`w-120 h-20 ${videoID ? "cursor-pointer" : "cursor-default"} rounded-full mt-12 bg-stone-700 border-2 border-stone-400`}
        disabled={videoID == null}
        onClick={() => {
          navigate(videoAnalysisPath, {
            state: { url: urlInput },
          });
        }}
      >
        {videoID ? (
          <span className="text-3xl text-stone-400">Next</span>
        ) : (
          <span className="text-3xl text-red-600">INVALID URL</span>
        )}
      </button>
    </div>
  );
};

export default UrlInputPage;
