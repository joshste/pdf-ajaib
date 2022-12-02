import { Request, Response } from "express";
import { swapPdf } from "./utils/swapPdf";

export const reorderHandler = async (req: Request, res: Response) => {
    if(!req.file?.buffer) return;
    
    const [indexA, indexB] = req.body["swap-instruction"].split(',').map((i:string) => parseInt(i, 10));

    const pdfBytes = req.file?.buffer;
    const resultPdfBytes = await swapPdf(pdfBytes, indexA, indexB);

    
    // Send pdf file to http response
    res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment;filename=result.pdf'
    });
    res.write(resultPdfBytes);
    res.end();

}