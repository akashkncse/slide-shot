import { useState, type ChangeEvent } from "react";
import PdfViewer from "./components/PdfViewer";
import * as pdfjsLib from "pdfjs-dist";

function App() {
  const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [pno, setPno] = useState<number>(1);
  const handlePdfLoad = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const buf = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
    setPdf(pdf);
  };
  const handleNext = () => {
    setPno(pno + 1);
  };
  const handlePrev = () => {
    setPno(pno - 1);
  };
  return (
    <>
      <input
        type="file"
        accept="application/pdf"
        onChange={handlePdfLoad}
        style={{ display: "block" }}
      ></input>
      <button
        disabled={pno == pdf?.numPages ? true : false}
        onClick={handleNext}
      >
        Next
      </button>
      <button disabled={pno == 1 ? true : false} onClick={handlePrev}>
        Prev
      </button>
      <span>
        {pno}/{pdf?.numPages}
      </span>
      {pdf && <PdfViewer pdf={pdf} pno={pno} />}
    </>
  );
}

export default App;
