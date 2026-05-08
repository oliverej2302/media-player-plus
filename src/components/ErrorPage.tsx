import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <div className="bg-mauve-800 h-screen w-full px-20 flex flex-col justify-center items-center">
        <span className="text-3xl text-stone-400">404 not found</span>
        <Link to="/" className="text-3xl text-stone-400 underline">
          Return to Home
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
