import { useState } from "react";

const Page = () => {
  const [urlInput, setUrlInput] = useState("");
  const isValidUrl = urlInput.includes("https://www.youtube.com");

  return (
    <>
      <form className="bg-mauve-800 h-screen w-full px-20 flex flex-col justify-center items-center">
        <input
          className="w-full p-6 rounded-2xl bg-stone-700 border-2 border-stone-400 text-stone-400 text-4xl text-center z-1"
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
        {isValidUrl ? (
          <button
            className="w-120 h-20 rounded-full mt-12 bg-stone-700 border-2 border-stone-400"
            onClick={() => console.log("clicked")}
          >
            <span className="text-3xl text-stone-400">Download</span>
          </button>
        ) : (
          <div className="w-120 h-20 rounded-full mt-12 bg-stone-700 border-2 border-stone-400 flex justify-center items-center">
            <span className="text-3xl text-red-600">INVALID URL</span>
          </div>
        )}
      </form>
    </>
  );
};

export default Page;
