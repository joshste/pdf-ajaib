import { PDFDocument } from "pdf-lib";

export const removePdf = async (pdfBytes:Buffer, index:number) => {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    const a = index;


    pdfDoc.removePage(a);


    return pdfDoc.save();

}