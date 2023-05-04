import File from './Model.js';

export default function FileService() {

  function create(name) {
    const file = new File({ name });
    return file.save();
  }

  async function list() {
    return File.find();
  }

  return {
    create,
    list,
  };
}

export const fileService = FileService();
