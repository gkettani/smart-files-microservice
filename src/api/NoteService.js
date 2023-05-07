import Note from './Model.js';

async function create({ name, text }) {
  const note = new Note({name, text });
  const newnote = await note.save();
  return newnote;
}

function read(id) {
  return Note.findById(id);
}

function list() {
  return Note.find();
}

export default {
  create,
  list,
  read,
};
