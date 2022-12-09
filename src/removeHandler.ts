import { Request, Response } from "express";
import { removePdf } from "./utils/removePdf";
export const removeHandler = async (req: Request, res: Response) => {
    if (!req.file?.buffer) {
        res.status(400);
        res.end();
        return;
    };


    const removeIndex = parseInt(req.body["remove-index"], 10);
    const pdfBytes = req.file?.buffer;
    
    try {
        const resultPdfBytes = await removePdf(pdfBytes, removeIndex);
        if (!resultPdfBytes) {
            res.status(400);
            res.end();
            return;
        }
            
        res.writeHead(200, {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment;filename=result.pdf'
        });
        res.write(resultPdfBytes);
        res.end();
    } catch (e) {
        res.status(500);
        res.end();
    }

    

    
}