import { Schema, model } from 'mongoose';

const FolderSchema = new Schema({
  name: String,
  user_id: {
    type: String,
    // unique: true,
    // required: true,
  }
}, {
  timestamps: true,
});

export default model('Folder', FolderSchema);