import fs from "fs";
import express from "express";
import { uploadFile, connectDB } from "./lib/mongodb.js";
import upload from "./middlewares/fileUpload.js";
import { fileService } from "./api/Service.js";

connectDB();

const app = express();
app.use(express.json());

/**
 * @route GET /example
 * @desc Example route
 */
app.post("/create-example", (req, res) => {
  const filename = req.body.filename;
  // Create a new file
  fileService.create(filename);
  res.send("File created successfully");
});

/**
 * @route GET /example
 * @desc Example route
 */
app.get("/", async (req, res) => {
  const files = await fileService.list();
  console.log(files);
  // res.send("Hello World");
  res.json(files);
});

/**
 * @route POST /upload
 * @desc Uploads file to DB
 */
app.post("/upload", upload.single("file"), (req, res) => {
  const filename = req.file.originalname;
  const filepath = req.file.path;

  uploadFile(filepath, filename)
    .then(() => {
      res.send("File uploaded successfully");
    })
    .catch((error) => {
      console.log(error);
      res.send("Error uploading file");
    })
    .finally(() => {
      // Delete the file from the uploads folder
      fs.unlink(filepath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started on port 3000");
});
