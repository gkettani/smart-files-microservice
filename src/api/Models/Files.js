import { Schema, model } from 'mongoose';

const FileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  transcript_id: {
    type: Schema.Types.ObjectId,
    ref: 'Transcript',
  },
  notes: String,
  user_id: {
    type: String,
    unique: true,
    required: true,
  },
  mimetype: String,
  fs_file_id: {
    type: Schema.Types.ObjectId, 
    ref: 'fs.files',
    },
  synthesis_id: {
    type: Schema.Types.ObjectId,
    ref: 'Synthesis',
  },
  folder_id: {
    type: Schema.Types.ObjectId,
    ref: 'Folder',
  }
},{
  timestamps: true,
});

export default model('File', FileSchema);
