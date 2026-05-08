import { useLocation } from "react-router-dom";

const VideoAnalysisPage = () => {
  const { state } = useLocation();
  const { url } = state;

  const downloadVideo = async (youtubeUrl: string) => {
    const res = await fetch("https://api.cobalt.tools/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        url: youtubeUrl,
        videoQuality: "720",
        filenameStyle: "pretty",
      }),
    });

    const data = await res.json();

    if (data.url) {
      const a = document.createElement("a");
      a.href = data.url;
      a.download = "video.mp4";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  downloadVideo(url);

  return (
    <>
      <div className="bg-mauve-800 h-screen w-full px-20 flex flex-col justify-center items-center">
        <span className="text-3xl text-stone-400">Starting download...</span>
      </div>
    </>
  );
};

export default VideoAnalysisPage;
