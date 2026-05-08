import { useParams } from "react-router-dom";

const VideoAnalysisPage = () => {
  const params = useParams<{ url: string }>();
  return (
    <>
      <div className="bg-mauve-800 h-screen w-full px-20 flex flex-col justify-center items-center">
        <span className="text-3xl text-stone-400">
          video download here: {params.url}
        </span>
      </div>
    </>
  );
};

export default VideoAnalysisPage;
