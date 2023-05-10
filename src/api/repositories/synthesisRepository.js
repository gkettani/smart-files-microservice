import Synthesis from '../models/Syntheses.js';

/**
 * List all syntheses for a user
 * @param {String} userId - User id
 * @returns {Promise<Synthesis[]>}
 */
// const list = async (userId) => {
//   return Synthesis.find({ user: userId }).select('-__v -user_id');
// };

const list = async () => {
  return Synthesis.find().select('-__v');
};

/**
 * Create and save a new synthesis
 * @returns {Promise<Synthesis>}
 */
const create = async (synthesis) => {
  return Synthesis(synthesis).save();
};

const remove = async (id) => {
  return Synthesis.findByIdAndDelete(id);
};

const read = async (id) => {
  return Synthesis.findById(id);
};

/**
 * Update a synthesis & return the updated synthesis
 * @returns {Promise<Synthesis>}
 */
const update = async (id, synthesis) => {
  return Synthesis.findByIdAndUpdate(id, synthesis, { new: true });
};

export default {
  list,
  create,
  remove,
  read,
  update,
};
