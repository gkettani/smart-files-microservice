import File from '../models/Files.js';

/**
 * List all files by passing params
 * @param {Object} params - Query params i.e. { user_id, folder_id }
 * @returns {Promise<File[]>}
 */
const list = async (params) => {
  return File.find(params).select('-__v -user_id');
};

/**
 * Create and save a new file
 * @returns {Promise<File>}
 */
const create = async (file) => {
  return File(file).save();
};

const remove = async (id) => {
  return File.findByIdAndDelete(id);
};

const read = async (id) => {
  return File.findById(id);
};

/**
 * Update a file & return the updated file
 * @returns {Promise<File>}
 */
const update = async (id, file) => {
  return File.findByIdAndUpdate(id, file, { new: true });
};

export default {
  list,
  create,
  remove,
  read,
  update,
};
