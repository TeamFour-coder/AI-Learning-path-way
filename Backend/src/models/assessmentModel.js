import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    skillType: { type: String, required: true },
    score: { type: Number, required: true },
    difficultyLevel: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    date: { type: Date, default: Date.now },
});

export default mongoose.model("Assessment", assessmentSchema);
