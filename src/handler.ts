import { RequestHandler } from "express";
import { PdfProcessor } from "./PdfProcessor";
import { modifierParser } from "./utils/modifierParser";

export const handler:RequestHandler = async(req, res) => {
    if (req.file?.buffer) {
        const pdfBytes = req.file?.buffer;

        
        // misal ingin ditempelkan image A pada halaman 1 posisi (50,100)
        // dan ingin ditempelkan text "Halo" besarnya 12 pada halaman 2 posisi (100,100) 
        // (tentative) req.body = {
        // ""
        // } 
        const pdfRequest = modifierParser(req.body);
        
        const pdfModifer = new PdfProcessor(pdfBytes, pdfRequest);
        const modifiedPdfBytes = await pdfModifer.getResult();

        // return modified pdf to client (browser will automaticaly download).
        res.writeHead(200, {'Content-Type':'application/octet-stream', 
        'Content-Disposition':'attachment;filename=result.pdf'});
        res.write(modifiedPdfBytes);
        res.end();
    }
}



