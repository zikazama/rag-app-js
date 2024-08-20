import express from "express";
import mongoose from "mongoose";
import PDF from "./models/PDFModel.js";
import runRAG from "./utils/rag.js";
import ragApplication from "./config/ragConfig.js";

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/ragApp");

app.use(express.json());

// API endpoint untuk mengunggah PDF dan memprosesnya
app.post("/upload", async (req, res) => {
  try {
    const filePath = req.body.filePath; // Path ke file PDF
    const response = await runRAG(filePath);

    const pdfDocument = new PDF({
      title: req.body.title || "Untitled PDF",
      content: response,
    });

    await pdfDocument.save();

    res
      .status(200)
      .json({
        message: "PDF processed and saved successfully!",
        data: response,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint untuk mengambil PDF yang tersimpan
app.get("/pdfs", async (req, res) => {
  try {
    const pdfs = await PDF.find();
    res.status(200).json(pdfs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API untuk jawab pertanyaan
app.post("/chat", async (req, res) => {
  try {
    console.log(ragApplication);
    // const response = await ragApplication.query(req.body.message);
    // res
    //   .status(200)
    //   .json({
    //     message: "Success",
    //     data: response,
    //   });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
