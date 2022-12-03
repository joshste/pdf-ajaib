import express from "express";
import multer from "multer";
import cors from "cors";
import { reorderHandler } from "./reorderHandler";
import { imageHandler } from "./imageHandler";

const port = process.env.PORT || "8080"

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors())

app.get('/', (req, res) => {
  res.send("<h1>Hello!</h1>");
});

app.post('/reorder-pdf', upload.single("pdf-file"), reorderHandler)

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

