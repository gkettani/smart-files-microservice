import fs from "fs";
import express from "express";
import { uploadFile, downloadFile, connectDB } from "./lib/mongodb.js";
import upload from "./middlewares/fileUpload.js";
import FileService from "./api/Service.js";
import QueueService from "./lib/rabbitmq.js";
import config from "./config/config.js";

connectDB();

const app = express();
app.use(express.json());

/**
 * @route GET /example
 * @desc Example route
 */
app.post("/create-example", (req, res) => {
  const name = req.body.filename;
  // Create a new file
  FileService.create({ name });
  res.send("File created successfully");
});

/**
 * @desc List all files
 */
app.get("/", async (req, res) => {
  try {
    const files = await FileService.list();
    res.status(200).json(files);
  } catch (error) {
    // console.log(error);
    res.status(500).send("Error listing files");
  }
});

/**
 * @desc Uploads fs.file to DB and creates a new file associated with it 
 */
app.post("/upload", upload.single("file"), async (req, res) => {
  const filename = req.file?.originalname;
  const filepath = req.file?.path;
  if (!filename && !filepath) return res.status(400).send("No file transmitted");
  
  try{
    const fs_file = await uploadFile(filepath, filename);
    // Create a new file
    const file = await FileService.create({
      name: filename,
      transcript: null,
      fs_file: fs_file._id,
      mimetype: req.file.mimetype,
    });
    res.status(201).json(file);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error uploading file");
  } finally {
    // Delete the file from the uploads folder
    fs.unlink(filepath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
});

/**
 * @desc Downloads file from DB
 * @param {string} id - The id of the fs.file to download
 */
app.get("/download/:id", async (req, res) => {
  const fileId = req.params.id;
  try {
    await downloadFile(fileId, res);
  } catch (error) {
    console.log(error);
    res.send("Error downloading file");
  }
});

/**
 * @desc Send notification to transcription service
 * @param {string} id - The id of the file to transcribe
 */
app.post("/transcribe/:id", async (req, res) => {
  try {
    const file = await FileService.read(req.params.id);
    if (!file) {
      res.status(404).send("File not found");
      return;
    }
    await QueueService.sendToQueue(file.fs_file);
    res.status(200).send("Transcription started");
  } catch (error) {
    res.status(500).send("Error starting transcription");
  }
});

/**
 * @desc Read a file from DB
 * @param {string} id - The id of the file to read
 */
app.get("/:id", async (req, res) => {
  const fileId = req.params.id;
  try {
    const file = await FileService.read(fileId);
    res.status(200).json(file);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error reading file");
  }
});

const { PORT } = config;

app.listen(PORT, () => {
  console.log("Server started on port 3000");
});
