import { Schema, model } from 'mongoose';

const NoteSchema = new Schema({
  name: String,
  text: String,{
  timestamps: true,
});

export default model('Note', FileSchema);
