import fs from "fs";
import express from "express";
import amqp from 'amqplib';
import { uploadFile, downloadFile, connectDB } from "./lib/mongodb.js";
import upload from "./middlewares/fileUpload.js";
import FileService from "./api/Service.js";

connectDB();
const QUEUE_NAME = 'files';
const connection = await amqp.connect('amqp://localhost');
const channel = await connection.createChannel();
await channel.assertQueue(QUEUE_NAME, {
  durable: false
});


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
 * @route GET /example
 * @desc Example route
 */
app.get("/", async (req, res) => {
  const files = await FileService.list();
  res.json(files);
});

/**
 * @route POST /upload
 * @desc Uploads file to DB
 */
app.post("/upload", upload.single("file"), async (req, res) => {
  const filename = req.file.originalname;
  const filepath = req.file.path;

  try {
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
    res.send("Error uploading file");
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
 * @route get /download/:id
 * @desc Download file from DB
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

app.post("/transcribe/:id", async (req, res) => {
  channel.sendToQueue(QUEUE_NAME, Buffer.from(`${req.params.id}`));
  res.status(200).send("Transcription started");
});

app.get("/:id", async (req, res) => {
  const fileId = req.params.id;
  try {
    const file = await FileService.read(fileId);
    res.status(200).json(file);
  } catch (error) {
    console.log(error);
    res.send("Error downloading file");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started on port 3000");
});
