import { Schema, model } from "mongoose";

const SynthesesSchema = new Schema({
    title: String,
    text: String,
    isPublic: Boolean,
    quizz: String,
    tags: [String],
    embeddings: Array,
    recommendations: Array,
},
{
    timestamps: true,
});

export default model("Syntheses", SynthesesSchema);
