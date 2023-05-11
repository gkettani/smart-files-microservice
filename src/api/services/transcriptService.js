import TranscriptRepository from "../repositories/transcriptRepository.js";
import FileRepository from "../repositories/fileRepository.js";
import NotFoundError from "../../config/errors/NotFoundError.js";


const read = async (id) => {
  const transcript = await TranscriptRepository.read(id);
  if (!transcript) {
    throw new NotFoundError("transcript not found");
  }
  return transcript;
}

const readByFileId = async (id) => {
  const file = await FileRepository.read(id);
  if (!file) {
    throw new NotFoundError("file not found");
  }
  const transcript = await TranscriptRepository.read(file.transcript_id);

  return transcript;
}


export default {
  read,
  readByFileId
};
