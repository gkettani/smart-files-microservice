import File from './Models/Files.js';

async function create({ name, transcript, fs_file, mimetype }) {
  const file = new File({ name, transcript, fs_file, mimetype });
  const newfile = await file.save();
  return newfile;
}

function read(id) {
  return File.findById(id);
}

function list() {
  return File.find();
}

export default {
  create,
  list,
  read,
};
