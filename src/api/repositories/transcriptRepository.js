import Transcript from '../models/Transcripts.js';

/**
 * List all transcripts by passing params
 * @param {Object} params - Query params i.e. { user_id }
 * @returns {Promise<Folder[]>}
 */
const list = async (...params) => {
  return Transcript.find(...params).select('-__v');
};

/**
 * Create and save a new Transcript
 * @returns {Promise<Transcript>}
 */
const create = async (transcript) => {
  return Transcript(transcript).save();
};

const remove = async (id) => {
  return Transcript.findByIdAndDelete(id);
};

const read = async (id) => {
  return Transcript.findById(id);
};

/**
 * Update a Transcript & return the updated Transcript
 * @returns {Promise<Transcript>}
 */
const update = async (id, transcript) => {
  return Transcript.findByIdAndUpdate(id, transcript, { new: true });
};

export default {
  list,
  create,
  remove,
  read,
  update,
};
