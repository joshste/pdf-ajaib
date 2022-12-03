import { Request, Response } from "express";
import { swapPdf } from "./utils/swapPdf";
import { ReorderInput, validateReorderInput } from "./utils/validateReorderInput";
export const reorderHandler = async (req: Request, res: Response) => {
    if (!req.file?.buffer) {
        res.status(400);
        res.end();
        return;
    };

    const satisfiedBody: ReorderInput = req.body;
    const body = validateReorderInput(satisfiedBody);
    if (!body) {
        res.status(400);
        res.end();
        return;
    }

    const [indexA, indexB] = body["swap-instruction"].split(',').map((i: string) => parseInt(i, 10));
    const pdfBytes = req.file?.buffer;
    
    try {
        const resultPdfBytes = await swapPdf(pdfBytes, indexA, indexB);
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