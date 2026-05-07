const Page = () => {
  return (
    <div className="bg-mauve-800 h-screen w-full px-20 flex flex-col justify-center items-center">
      <input
        className="w-full p-6 rounded-2xl bg-stone-700 border-2 border-stone-400 text-stone-400 text-4xl text-center z-1"
        type="text"
      />
      <button className="w-120 h-20 rounded-full mt-12 bg-stone-700 border-2 border-stone-400">
        <span className="text-3xl text-stone-400">Download</span>
      </button>
    </div>
  );
};

export default Page;
