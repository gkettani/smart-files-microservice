import { Schema, model } from "mongoose";

const SynthesisSchema = new Schema({
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

export default model("Synthesis", SynthesisSchema);
