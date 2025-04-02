import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    subject: { 
        type: String, 
        enum: ["Physics", "Chemistry", "Maths"],  // Add subjects here
        required: true 
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Assessment", assessmentSchema);

