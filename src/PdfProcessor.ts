import { ModifierPdf } from "./ModifierPdf";
import { PDFDocument } from "pdf-lib";

export class PdfProcessor {
    pdfBytes:Buffer;
    modifier:ModifierPdf;

    constructor(pdfBytes:Buffer, pdfRequest:ModifierPdf) {
        this.pdfBytes=pdfBytes;
        this.modifier=ModifierPdf;
    }
    
    getResult = async () => {
        const pdfDoc = await PDFDocument.load(this.pdfBytes);
        const page = pdfDoc.addPage([550, 750]);
        page.drawText('Hello!!!', { x: 50, y: 700, size: 20 });
        
        return pdfDoc.save();
    }
}

     
        