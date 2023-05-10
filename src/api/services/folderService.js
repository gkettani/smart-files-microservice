import Folder from '../models/Folders.js';

async function create(user_id, name) {
  const folder = new Folder({ name, user_id });
  const newfolder = await folder.save();
  return newfolder;
}

function read(id) {
  return Folder.findById(id);
}

function list() {
  return Folder.find();
}

export default {
  create,
  list,
  read,
};
