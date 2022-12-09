import express from "express";
import multer from "multer";
import cors from "cors";
import { reorderHandler } from "./reorderHandler";
import { textHandler } from "./textHandler";
import { imageHandler } from "./imageHandler";
import { removeHandler } from "./removeHandler";

const port = process.env.PORT || "8080"

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors())

app.get('/', (req, res) => {
  res.send("<h1>Hello!</h1>");
});

app.post('/reorder-pdf', upload.single("pdf-file"), reorderHandler)
app.post('/add-text', upload.single("pdf-file"),textHandler)
app.post('/remove-page', upload.single("pdf-file"),removeHandler)

app.post('/add-image', upload.fields([{
  name:'pdf-file',
  maxCount:  1
},{
  name: 'image-file',
  maxCount: 1
}]), imageHandler)

app.listen(port, () => {
  console.log("http://localhost:8080/");
});

