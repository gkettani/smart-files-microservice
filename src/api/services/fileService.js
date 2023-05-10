import fs from "fs";
import FileRepository from "../repositories/fileRepository.js";
import { uploadFile } from "../../lib/mongodb.js";
import BadRequestError from "../../config/errors/BadRequestError.js";
import NotFoundError from "../../config/errors/NotFoundError.js";
import QueueService from "../../lib/rabbitmq.js";

/**
 * List all files by passing params
 * @param {Object} params - Query params i.e. { user_id, folder_id }
 */
const list = async (params) => {
  return FileRepository.list(params);
}

const create = async ({ user_id, file_p, fs_file_p }) => {
  /* Create a new fs_file  */
  const filepath = fs_file_p?.path;
  const filename = fs_file_p?.originalname;
  if (!filename && !filepath) {
    throw new BadRequestError("No file transmitted");
  }
  let fs_file;
  try {
    fs_file = await uploadFile(filepath, filename);
  } catch (error) {
    throw new Error("Error uploading file");
  } finally {
    /* Delete the file from the uploads folder once uploaded to the db */
    fs.unlink(filepath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  /* Create a new file */
  let file;
  try {
    file = await FileRepository.create({
      name: file_p.name,
      description: file_p.description,
      fs_file_id: fs_file._id,
      mimetype: fs_file_p.mimetype,
      notes: file_p.notes,
      folder_id: file_p.folder_id,
      // user_id,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error creating file");
  }

  return file;
}

const transcribe = async (file_id) => {
  const file = await FileRepository.read(file_id);
  if (!file) {
    throw new NotFoundError("File not found");
  }
  try {
    await QueueService.sendToQueue('files', file.fs_file_id);
  } catch (error) {
    throw new Error("Error starting transcription");
  }
}

const synthesize = async (file_id) => {
  const file = await FileRepository.read(file_id);
  if (!file) {
    throw new NotFoundError("File not found");
  }

  try {
    await QueueService.sendToQueue('syntheses', file.fs_file_id);
  } catch (error) {
    throw new Error("Error starting synthesis");
  }
}


const remove = async (id) => {
  return FileRepository.remove(id);
}

const read = async (id) => {
  const file = await FileRepository.read(id);
  if (!file) {
    throw new NotFoundError("File not found");
  }

  return file;
}

const update = async (id, file) => {
  const f = await FileRepository.read(id);
  if (!f) {
    throw new NotFoundError("File not found");
  }

  return FileRepository.update(id, file);
}

export default {
  list,
  create,
  remove,
  read,
  update,
  transcribe,
  synthesize,
};
