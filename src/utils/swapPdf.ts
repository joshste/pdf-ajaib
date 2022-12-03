import { PDFDocument } from "pdf-lib";

export const swapPdf = async (pdfBytes:Buffer, indexA:number, indexB:number) => {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    const a = Math.min(indexA, indexB);
    const b = Math.max(indexA, indexB);

    const totalPages = pdfDoc.getPageCount();
    if (a < 0 || b >= totalPages) return null;

    const pageA = pdfDoc.getPage(a)
    const pageB = pdfDoc.getPage(b)
    pdfDoc.removePage(b);
    pdfDoc.removePage(a);
    pdfDoc.insertPage(a, pageB);
    pdfDoc.insertPage(b, pageA);

    return pdfDoc.save();

}