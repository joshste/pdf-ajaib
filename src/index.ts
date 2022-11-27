import express from "express";
import multer from "multer";
import { handler } from "./handler";
import cors from "cors";

const port = process.env.PORT || "8080"

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors())

app.get('/', (req, res) => {
    res.send("<h1>Hello!</h1>");
  });


app.post('/pdf', upload.single('pdf-file'), handler);

app.listen(port, () => {
    console.log("http://localhost:8080/");
});

