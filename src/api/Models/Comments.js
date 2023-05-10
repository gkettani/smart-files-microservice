import { Schema, model } from 'mongoose';

const CommentSchema = new Schema({
  text: String,
  rate: Number,
  username: String,
  synthesis_id: {
    type: Schema.Types.ObjectId,
    ref: 'Syntheses',
    unique: true,
  }
},{
  timestamps: true,
});

export default model('Comment', CommentSchema);