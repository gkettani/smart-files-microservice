import Transcrypt from '../models/Transcrypts.js';

/**
 * List all Transcrypts for a user
 * @param {String} userId - User id
 * @returns {Promise<Transcrypt[]>}
 */
// const list = async (userId) => {
//   return Transcrypt.find({ user: userId }).select('-__v -user_id');
// };

const list = async () => {
  return Transcrypt.find().select('-__v');
};

/**
 * Create and save a new Transcrypt
 * @returns {Promise<Transcrypt>}
 */
const create = async (transcrypt) => {
  return Transcrypt(transcrypt).save();
};

const remove = async (id) => {
  return Transcrypt.findByIdAndDelete(id);
};

const read = async (id) => {
  return Transcrypt.findById(id);
};

/**
 * Update a Transcrypt & return the updated Transcrypt
 * @returns {Promise<Transcrypt>}
 */
const update = async (id, transcrypt) => {
  return Transcrypt.findByIdAndUpdate(id, transcrypt, { new: true });
};

export default {
  list,
  create,
  remove,
  read,
  update,
};
