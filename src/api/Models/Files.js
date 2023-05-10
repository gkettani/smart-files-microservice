import { Schema, model } from 'mongoose';

const FileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  transcript: String,
  notes: String,
  user_id: {
    type: String,
    // unique: true,
    // required: true,
  },
  mimetype: String,
  fs_file_id: {
    type: Schema.Types.ObjectId, 
    ref: 'fs.files',
    },
  synthesis_id: {
    type: Schema.Types.ObjectId,
    ref: 'Syntheses',
  },
  folder_id: {
    type: Schema.Types.ObjectId,
    ref: 'Folder',
    required: true,
  }
},{
  timestamps: true,
});

export default model('File', FileSchema);
