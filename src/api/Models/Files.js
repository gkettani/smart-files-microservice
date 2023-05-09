import { Schema, model } from 'mongoose';

const FileSchema = new Schema({
  name: String,
  transcript: String,
  fs_file: { 
    type: Schema.Types.ObjectId, 
    ref: 'fs.files',
    unique: true,
  },
  mimetype: String,
},{
  timestamps: true,
});

export default model('File', FileSchema);
