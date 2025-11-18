import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
