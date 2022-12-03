import { Request, Response } from "express";
import { PDFDocument } from "pdf-lib";

export const imageHandler = async (req: Request, res: Response) => {
    if(!req.file?.buffer)
    {
        res.status(400);
        res.end();
        return;
    } ;

    const [posX, posY] = req.body["position"].split(',').map((i:string) => parseInt(i, 10));
    const pageIdx = parseInt(req.body["page-idx"], 10)

    if (!req.files){
        res.status(400);
        res.end();
        return;
    };
    try {
        const files = JSON.parse(JSON.stringify(req.files));
        const pdfBytes = Uint8Array.from(files["pdf-file"][0].buffer["data"]);
        const imageBytes = Uint8Array.from(files["image-file"][0].buffer["data"]);
    
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const image = await pdfDoc.embedPng(imageBytes);
    
        const page = pdfDoc.getPage(pageIdx)
        const images = image.scale(0.5)
        page.drawImage(image, {
            x: posX,
            y: posY,
            width: 100,
            height: 100,
          })
    
        const pdf = await pdfDoc.save()
        res.writeHead(200, {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment;filename=result.pdf'
        });
        res.write(pdf);
        res.end();
  
    } catch (e)
    {
        res.status(500);
        res.end();
    }
    
}