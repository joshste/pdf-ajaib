import express from "express";
import multer from "multer";
import cors from "cors";
import { reorderHandler } from "./reorderHandler";
import { drawingHandler } from "./drawingHandler";

const port = process.env.PORT || "8080"

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors())

app.get('/', (req, res) => {
  res.send("<h1>Hello!</h1>");
});

app.post('/reorder-pdf', upload.single("pdf-file"), reorderHandler)
app.post('/add-drawing', upload.single("pdf-file"), drawingHandler)

app.listen(port, () => {
  console.log("http://localhost:8080/");
});

