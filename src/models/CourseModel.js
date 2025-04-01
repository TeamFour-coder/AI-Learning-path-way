import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    isFree: { type: Boolean, default: true },
});

export default mongoose.model("Course", courseSchema);
