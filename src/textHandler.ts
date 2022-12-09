import { Request, Response } from "express";
import { PDFDocument, rgb, StandardFonts  } from "pdf-lib";

export const textHandler = async (req: Request, res: Response) => {
    if (!req.file?.buffer) {
        res.status(400);
        res.end();
        return;
    };

    const [X, Y] = req.body["position"].split(',').map((i:string) => parseInt(i, 10));
    const noPage = req.body["no-page"]
    const pdfBytes = req.file?.buffer

    try {
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const page = pdfDoc.getPage(noPage);
        const text = req.body["user-text"]
        page.drawText(text, {
            x: X,
            y: Y,
            size: 50,
            font: helveticaFont,
            color: rgb(1,1,1),
        })
        const pdf = await pdfDoc.save()
        res.writeHead(200, {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment;filename=result.pdf'
        });
        res.write(pdf);
        res.end();
    }
    catch(e){
        res.status(500);
        res.end();
    }
    

}