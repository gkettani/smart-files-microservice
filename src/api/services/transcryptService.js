import TranscryptRepository from "../repositories/transcryptRepository.js";
import NotFoundError from "../../config/errors/NotFoundError.js";


/**
 * List all transcrypts by passing params
 * @param {Object} params - Query params i.e. { user_id, transcrypt_id }
 */
const list = async (params) => {
  return TranscryptRepository.list(params);
}

const create = async (transcrypt) => {
  return TranscryptRepository.create(transcrypt) ;
}

const remove = async (id) => {
  const transcrypt = await TranscryptRepository.read(id);
  if (!transcrypt) {
    throw new NotFoundError("transcrypt not found");
  }
  return TranscryptRepository.remove(id);
}

const read = async (id) => {
  const transcrypt = await TranscryptRepository.read(id);
  if (!transcrypt) {
    throw new NotFoundError("transcrypt not found");
  }
  return transcrypt;
}

const update = async (id, transcrypt) => {
  const transcrypt = await TranscryptRepository.read(id);
  if (!transcrypt) {
    throw new NotFoundError("transcrypt not found");
  }
  return TranscryptRepository.update(id, file);
}

export default {
  list,
  create,
  remove,
  read,
  update
};
