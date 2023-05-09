import { Schema, model } from 'mongoose';

const SynthesesSchema = new Schema({
    titles: String,
    text: String,
    isPublic: Boolean
    });


export default model('Syntheses', SynthesesSchema);