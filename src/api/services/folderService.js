import FolderRepository from "../repositories/folderRepository.js";
import BadRequestError from "../../config/errors/BadRequestError.js";
import NotFoundError from "../../config/errors/NotFoundError.js";


/**
 * List all folders by passing params
 * @param {Object} params - Query params i.e. { user_id, folder_id }
 */
const list = async (params) => {
  return FolderRepository.list(params);
}

const create = async (folder) => {
  return FolderRepository.create(folder) ;
}

const remove = async (id) => {
  const folder = await FolderRepository.read(id);
  if (!folder) {
    throw new NotFoundError("Folder not found");
  }
  return FolderRepository.remove(id);
}

const read = async (id) => {
  const folder = await FolderRepository.read(id);
  if (!folder) {
    throw new NotFoundError("Folder not found");
  }
  return folder;
}

export default {
  list,
  create,
  remove,
  read
};
