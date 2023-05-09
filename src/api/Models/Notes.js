import { Schema, model } from 'mongoose';

const NoteSchema = new Schema({
  text: String,
  titles: [String]
});

export default model('Note', NoteSchema);