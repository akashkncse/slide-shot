import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";

export default function PdfViewer({
  pdf,
  pno,
}: {
  pdf: pdfjsLib.PDFDocumentProxy;
  pno: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const render = async () => {
      const page = await pdf.getPage(pno);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: ctx, canvas, viewport }).promise;
    };
    render();
  }, [pdf, pno]);

  return <canvas ref={canvasRef} />;
}
