import { Request, Response } from "express";
import { PDFDocument, rgb, StandardFonts  } from "pdf-lib";

export const textHandler = async (req: Request, res: Response) => {
    if (!req.file?.buffer) {
        res.status(400);
        res.end();
        return;
    };

    const [X, Y] = req.body["position"].split(',').map((i:string) => parseInt(i, 10));
    const noPage = parseInt(req.body["no-page"], 10)
    const pdfBytes = req.file?.buffer
    const red = parseFloat(req.body["red"])
    const green = parseFloat(req.body["green"])
    const blue = parseFloat(req.body["blue"])
    const size = parseInt(req.body["size"], 10)

    try {
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const page = pdfDoc.getPage(noPage);
        const text = req.body["user-text"]
        page.drawText(text, {
            x: X,
            y: Y,
            size: size,
            font: helveticaFont,
            color: rgb(red, green, blue)
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