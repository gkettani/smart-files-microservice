import express from "express";
import { downloadFile, connectDB } from "./lib/mongodb.js";
import upload from "./middlewares/fileUpload.js";
import FileService from "./api/services/fileService.js";
import FolderService from "./api/services/folderService.js";
import TranscriptService from "./api/services/transcriptService.js";
import SynthesisService from "./api/services/synthesisService.js";
import config from "./config/config.js";
import errorHandler from "./middlewares/errorMiddleware.js";

connectDB();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  req.user = { id: req.headers["x-user-id"] };
  next();
});

/**
 * Files routes ------------------------------------------
 */

/**
 * @desc List all files
 */
app.get("/files", async (req, res, next) => {
  console.log(req.user);
  try {
    const files = await FileService.list({ user_id: req.user.id });
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
    console.log(req.user);
    const file = await FileService.create({
      user_id: req.user.id,
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
 * @desc List all private Syntheses
 */
app.get("/syntheses", async (req, res, next) => {
  try {
    const syntheses = await SynthesisService.list({ user_id: req.user.id });
    res.status(200).json(syntheses);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/**
 * @desc List all public Syntheses
 */
app.get("/syntheses/public", async (req, res, next) => {
  try {
    const syntheses = await SynthesisService.listPublic();
    res.status(200).json(syntheses);
  } catch (error) {
    console.log(error);
    next(error);
  }
});


/**
 * @desc Read a Synthesis by id
 */
app.get("/syntheses/:id", async (req, res, next) => {
  try {
    const synthesis = await SynthesisService.read(req.params.id);
    res.status(200).json(synthesis);
  } catch (err) {
    console.log(err);
    next(err);
  }
})

/**
 * @desc Read a Synthesis by id
 */
app.put("/syntheses/:id", async (req, res, next) => {
  try {
    // Set isPublic to true
    const synthesis = await SynthesisService.update(req.params.id);
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
 * Transcripts routes ------------------------------------------
 */

/**
 * @desc Read a Transcripts by id
 */
app.get("/files/:id/transcript", async (req, res, next) => {
  try {
    const transcript = await TranscriptService.readByFileId(req.params.id);
    res.status(200).json(transcript);
  } catch (err) {
    console.log(err);
    next(err);
  }
})
 
/**
 * End of Transcripts routes ------------------------------------------
 */



/**
 * Folders routes ------------------------------------------
 */

/**
 * @desc Create a new folder
 */
app.post("/folders", async (req, res, next) => {
  try {
    const folder = await FolderService.create(req.user.id, req.body.name);
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
    const folders = await FolderService.list({ user_id: req.user.id });
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
 * @desc Delete a folder
 */
app.delete("/folders/:id", async (req, res, next) => {
  try {
    const folder = await FolderService.remove(req.params.id);
    res.status(200).json(folder);
  } catch (error) {
    console.log(error);
    next(error);
  }
});


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
