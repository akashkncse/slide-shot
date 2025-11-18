import { useState, type ChangeEvent } from "react";
import PdfViewer from "./components/PdfViewer";

function App() {
  const [buffer, setBuffer] = useState<ArrayBuffer | null>(null);
  const handlePdfLoad = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const buf = await file.arrayBuffer();
    setBuffer(buf);
  };

  return (
    <>
      <input
        type="file"
        accept="application/pdf"
        onChange={handlePdfLoad}
        style={{ display: "block" }}
      ></input>

      {buffer && <PdfViewer buffer={buffer} />}
    </>
  );
}

export default App;
