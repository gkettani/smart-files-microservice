import { Schema, model } from 'mongoose';

const CommentSchema = new Schema({
  text: String,
  rate: Number,
  username: String
});

export default model('Comment', CommentSchema);