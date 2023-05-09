import { Schema, model } from 'mongoose';

const TranscriptSchema = new Schema({
    text: String},{
    timestamps: true,
    });


export default model('Transcript', TranscriptSchema);