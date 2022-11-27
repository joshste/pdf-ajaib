import { Request } from "express";
import { ModifierImage } from "../ModifierImage";
import { ModifierPdf } from "../ModifierPdf"
import { ModifierText } from "../ModifierText";

export const modifierParser = (requestBody: Request) => {
    const text = new ModifierText()
    const image = new ModifierImage()
    const request = new ModifierPdf(text, image);

    return request;
}