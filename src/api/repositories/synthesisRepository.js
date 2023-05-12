import Synthesis from '../models/Syntheses.js';

/**
 * List all syntheses by passing params
 * @param {Object} params - Query params i.e. { user_id }
 * @returns {Promise<Folder[]>}
 */
const list = async (...params) => {
  return Synthesis.find(...params).select('-__v -user_id');
};

const read = async (id) => {
  return Synthesis.findById(id);
};

/**
 * Update a synthesis & return the updated synthesis
 * @returns {Promise<File>}
 */
const update = async (id, synthesis) => {
  return Synthesis.findByIdAndUpdate(id, synthesis, { new: true });
};

export default {
  list,
  read,
  update
};
