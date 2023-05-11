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

const create = async (synthesis) => {
  return SynthesisRepository.create(synthesis) ;
}

const remove = async (id) => {
  const synthesis = await SynthesisRepository.read(id);
  if (!synthesis) {
    throw new NotFoundError("Synthesis not found");
  }
  return SynthesisRepository.remove(id);
}

const read = async (id) => {
  const synthesis = await SynthesisRepository.read(id);
  if (!synthesis) {
    throw new NotFoundError("Synthesis not found");
  }
  return synthesis;
}

const update = async (id, synthesis) => {
  const synthesis = await SynthesisRepository.read(id);
  if (!synthesis) {
    throw new NotFoundError("synthesis not found");
  }
  return SynthesisRepository.update(id, file);
}

export default {
  list,
  create,
  remove,
  read,
  update
};
