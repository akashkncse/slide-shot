import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";

export default function PdfViewer({ buffer }: { buffer: ArrayBuffer }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const render = async () => {
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: ctx, canvas, viewport }).promise;
    };
    render();
  }, [buffer]);

  return <canvas ref={canvasRef} />;
}
