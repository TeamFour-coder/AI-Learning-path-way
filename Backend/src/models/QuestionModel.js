import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    skillType: { type: String, required: true },
    difficultyLevel: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
});

export default mongoose.model("Question", questionSchema);
