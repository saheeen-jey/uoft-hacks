import express from "express";
const app = express();
// const PORT = process.env.PORT || 3001;
import { uploadToIPFS } from "./load/upload.js";
// const bodyParser = require('body-parser');
import bodyParser from "body-parser";
import cors from "cors";
const port = 3001;


app.use(cors());
// app.use(express.json());  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.post("/send", (req, res) => {
  console.log(req.body);
  var u = uploadToIPFS(req.body)
  console.log("u is ",u)
  res.send(u);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
