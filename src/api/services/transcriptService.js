import TranscriptRepository from "../repositories/transcriptRepository.js";
import NotFoundError from "../../config/errors/NotFoundError.js";


const read = async (id) => {
  const transcript = await TranscriptRepository.read(id);
  if (!transcript) {
    throw new NotFoundError("transcript not found");
  }
  return transcript;
}

export default {
  read,
};
