import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UrlInputPage from "./components/UrlInputPage.tsx";
import VideoAnalysisPage from "./components/VideoAnalysisPage.tsx";
import ErrorPage from "./components/ErrorPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UrlInputPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/video",
    element: <VideoAnalysisPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
