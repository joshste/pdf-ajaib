import { Request, Response } from "express";
import { PDFDocument, rgb } from "pdf-lib";

export const drawingHandler = async (req: Request, res: Response) => {
    
    if (!req.file?.buffer) {
        res.status(400);
        res.end();
        return;
    };

    const pageIdx = parseInt(req.body["page-idx"], 10)
    const svgPath = req.body["svg-path"]
    const pdfBytes = req.file?.buffer;

    try {

        const pdfDoc = await PDFDocument.load(pdfBytes);
        const page = pdfDoc.getPage(pageIdx);

        // Tulis svgPath ke PDF
        
        const posX = parseInt(req.body["posX"], 10)
        const posY = parseInt(req.body["posY"], 10)

        const redValue = parseInt(req.body["red-value"], 10)
        const greenValue = parseInt(req.body["green-value"], 10)
        const blueValue = parseInt(req.body["blue-value"], 10)

        page.drawSvgPath(svgPath, {x:posX, y:posY, borderColor: rgb(redValue, greenValue, blueValue)})

        // ----

        const resultPdfBytes = await pdfDoc.save()
        res.writeHead(200, {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment;filename=result.pdf'
        });
        res.write(resultPdfBytes);
        res.end();

    }
    catch (e) {
        console.log(e)
        res.status(500);
        res.end();
    }

}