import { Schema, model } from "mongoose";

const TranscryptSchema = new Schema({
    text: String,
},
{
    timestamps: true,
});

export default model("Transcrypt", TranscryptSchema);
