import Folder from '../models/Folders.js';

/**
 * List all folders by passing params
 * @param {Object} params - Query params i.e. { user_id }
 * @returns {Promise<Folder[]>}
 */
const list = async (...params) => {
  return Folder.find(...params).select('-__v -user_id');
};
/**
 * Create and save a new folder
 * @returns {Promise<Folder>}
 */
const create = async (folder) => {
  return Folder(folder).save();
};

const remove = async (id) => {
  return Folder.findByIdAndDelete(id);
};

const read = async (id) => {
  return Folder.findById(id);
};

/**
 * Update a folder & return the updated folder
 * @returns {Promise<Folder>}
 */
const update = async (id, folder) => {
  return Folder.findByIdAndUpdate(id, folder, { new: true });
};

export default {
  list,
  create,
  remove,
  read,
  update,
};
