import { PDFDocument } from "pdf-lib";

export const swapPdf = async (pdfBytes:Buffer, indexA:number, indexB:number) => {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // TODO: replace this with swap page function.
    const page = pdfDoc.addPage([550, 750]);
    page.drawText('Hello!!!', { x: 50, y: 700, size: 20 });
    return pdfDoc.save();
    

}