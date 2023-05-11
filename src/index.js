import express from "express";
import { downloadFile, connectDB } from "./lib/mongodb.js";
import upload from "./middlewares/fileUpload.js";
import FileService from "./api/services/fileService.js";
import FolderService from "./api/services/folderService.js";
import TranscryptService from "./api/services/transcryptService.js";
import SynthesisService from "./api/services/synthesisService.js";
import config from "./config/config.js";
import errorHandler from "./middlewares/errorMiddleware.js";

connectDB();

const app = express();
app.use(express.json());

/**
 * Files routes ------------------------------------------
 */

/**
 * @desc List all files
 */
app.get("/files", async (req, res, next) => {
  try {
    const files = await FileService.list();
    res.status(200).json(files);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/**
 * @desc Create a new file and upload its fs.file to DB
 */
app.post("/files", upload.single("file"), async (req, res, next) => {
  try {
    const file = await FileService.create({
      // user_id: req.body.user_id,
      file_p: req.body,
      fs_file_p: req.file,
    });
    res.status(201).json(file);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/**
 * @desc Read a file from DB
 * @param {string} id - The id of the file to read
 */
app.get("/files/:id", async (req, res, next) => {
  try {
    const file = await FileService.read(req.params.id);
    res.status(200).json(file);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/**
 * @desc Delete a file from DB
 */
app.delete("/files/:id", async (req, res, next) => {
  try {
    const file = await FileService.remove(req.params.id);
    res.status(200).json(file);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/**
 * @desc Update a file
 */
app.put("/files/:id", async (req, res, next) => {
  try {
    const file = await FileService.update(req.params.id, req.body);
    res.status(200).json(file);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/**
 * @desc Send notification to transcription service
 * @param {string} id - The id of the file to transcribe
 */
app.post("/files/:id/transcribe", async (req, res, next) => {
  try {
    await FileService.transcribe(req.params.id);
    res.status(200).send("Transcription started");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/**
 * @desc Send notification to synthesis service
 * @param {string} id - The id of the file to synthesize
 */
app.post("/files/:id/synthesize", async (req, res, next) => {
  try {
    await FileService.synthesize(req.params.id);
    res.status(200).send("Synthesize started");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/**
 * End of Files routes ------------------------------------------
 */


/**
 * Syntheses routes ------------------------------------------
 */

/**
 * @desc Create a new Synthesis
 */
app.post("/synthesis", async (req, res, next) => {
  try {
    const synthesis = await SynthesisService.create(null, req.body.name);
    res.status(201).json(synthesis);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/**
 * @desc List all Synthesis
 */
app.get("/synthesis", async (req, res, next) => {
  try {
    const synthesis = await SynthesisService.list();
    res.status(200).json(synthesis);
  } catch (error) {
    console.log(error);
    next(error);
  }
});



/**
 * @desc Read a Synthesis by id
 */
app.get("/synthesis/:id", async (req, res, next) => {
  try {
    const synthesis = await SynthesisService.read(req.params.id);
    res.status(200).json(synthesis);
  } catch (err) {
    console.log(err);
    next(err);
  }
})
 

/**
 * End of Syntheses routes ------------------------------------------
 */



/**
 * Transcrypts routes ------------------------------------------
 */

/**
 * @desc Create a new Transcrypts
 */
app.post("/transcrypts", async (req, res, next) => {
  try {
    const transcrypt = await TranscryptService.create(null, req.body.name);
    res.status(201).json(transcrypt);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/**
 * @desc List all Transcrypts
 */
app.get("/transcrypts", async (req, res, next) => {
  try {
    const transcrypt = await TranscryptService.list();
    res.status(200).json(transcrypt);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/**
 * @desc Read a Transcrypts by id
 */
app.get("/transcrypts/:id", async (req, res, next) => {
  try {
    const transcrypt = await TranscryptService.read(req.params.id);
    res.status(200).json(transcrypt);
  } catch (err) {
    console.log(err);
    next(err);
  }
})
 
/**
 * End of Transcrypts routes ------------------------------------------
 */



/**
 * Folders routes ------------------------------------------
 */

/**
 * @desc Create a new folder
 */
app.post("/folders", async (req, res, next) => {
  try {
    const folder = await FolderService.create(null, req.body.name);
    res.status(201).json(folder);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/**
 * @desc List all folders
 */
app.get("/folders", async (req, res, next) => {
  try {
    const folders = await FolderService.list();
    res.status(200).json(folders);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/**
 * @desc List files of a folder
 */
app.get("/folders/:id/files", async (req, res, next) => {
  try {
    const files = await FileService.list({ folder_id: req.params.id });
    res.status(200).json(files);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/**
 * @desc Read folder by id
 */
app.get("/folders/:id", async (req, res, next) => {
  try {
    const folder = await FolderService.read(req.params.id);
    res.status(200).json(folder);
  } catch (err) {
    console.log(err);
    next(err);
  }
})
 

/**
 * End of Folders routes ------------------------------------------
 */


/**
 * @desc Downloads file from DB
 * @param {string} id - The id of the fs.file to download
 */
app.get("/download/:id", async (req, res, next) => {
  const fileId = req.params.id;
  try {
    await downloadFile(fileId, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

app.use(errorHandler);

const { PORT } = config;

app.listen(PORT, () => {
  console.log("Server started on port 3000");
});
