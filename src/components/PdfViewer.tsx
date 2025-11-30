import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";

export default function PdfViewer({
  pdf,
  pageNumber,
}: {
  pdf: pdfjsLib.PDFDocumentProxy;
  pageNumber: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let ignore = false;
    const render = async () => {
      const page = await pdf.getPage(pageNumber);
      if (ignore) return;
      const viewport = page.getViewport({ scale: 2 });
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: ctx, canvas, viewport }).promise;
    };
    render();

    return () => {
      ignore = true;
    };
  }, [pdf, pageNumber]);

  return <canvas ref={canvasRef} />;
}
