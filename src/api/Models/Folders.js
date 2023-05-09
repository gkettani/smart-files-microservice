import { Schema, model } from 'mongoose';

const FolderSchema = new Schema({
  text: String
});

export default model('Folder', FolderSchema);