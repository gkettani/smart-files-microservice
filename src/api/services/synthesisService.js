import SynthesisRepository from "../repositories/synthesisRepository.js";
import BadRequestError from "../../config/errors/BadRequestError.js";
import NotFoundError from "../../config/errors/NotFoundError.js";


/**
 * List all synthesis by passing params
 * @param {Object} params - Query params i.e. { user_id, synthesis_id }
 */
const list = async (params) => {
  return SynthesisRepository.list(params);
}

const read = async (id) => {
  const synthesis = await SynthesisRepository.read(id);
  if (!synthesis) {
    throw new NotFoundError("Synthesis not found");
  }
  return synthesis;
}

const update = async (id, data) => {
  const synthesis = await SynthesisRepository.update(id, data);
  if (!synthesis) {
    throw new NotFoundError("Synthesis not found");
  }
  return synthesis;
}


const listPublic = async () => {
  return SynthesisRepository.list({ isPublic: true });
}

export default {
  list,
  read,
  listPublic
};
