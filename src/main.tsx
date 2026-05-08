import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
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
    path: "/video/:url",
    element: <VideoAnalysisPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
