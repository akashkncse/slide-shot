import { useEffect, useState, type ChangeEvent } from "react";
import PdfViewer from "./components/PdfViewer";
import * as pdfjsLib from "pdfjs-dist";
import "./App.css";
function App() {
  const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [pNo, setpageNumber] = useState<number>(1);
  const handlePdfLoad = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const buf = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
    setPdf(pdf);
  };
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && pdf && pNo < pdf.numPages) {
        setpageNumber((prev) => prev + 1);
      }
      if (e.key === "ArrowLeft" && pNo > 1) {
        setpageNumber((prev) => prev - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [pdf, pNo]);

  const handleNext = () => {
    setpageNumber(pNo + 1);
  };
  const handlePrev = () => {
    setpageNumber(pNo - 1);
  };

  return (
    <>
    <div className="controls">
      <div className="fileinput">
        <input
          type="file"
          accept="application/pdf"
          onChange={handlePdfLoad}
          style={{ display: "block" }}
        ></input>
      </div>
      <div className="navigation">
        <button
          disabled={pNo == pdf?.numPages || !pdf ? true : false}
          onClick={handleNext}
        >
          Next
        </button>
        <button disabled={pNo == 1 ? true : false} onClick={handlePrev}>
          Prev
        </button>
        <span className="nopg">
          {pNo}/{pdf?.numPages}
        </span>
      </div>
    </div>
      <div className="parentviewer">
        <div className="viewer">{pdf && <PdfViewer pdf={pdf} pageNumber={pNo} />}</div>{" "}
      </div>
    </>
  );
}

export default App;
