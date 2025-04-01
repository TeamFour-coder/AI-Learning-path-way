import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }], 
    correctAnswer: { type: String, required: true },
    subject: { 
        type: String, 
        enum: ["Physics", "Chemistry", "Maths"],  // Ensure subject mapping
        required: true 
    },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    assessment: { type: mongoose.Schema.Types.ObjectId, ref: "Assessment" }
});

export default mongoose.model("Question", questionSchema);
