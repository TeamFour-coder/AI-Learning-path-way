import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    assessments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assessment" }], // Linking assessments
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Tracking enrolled courses
});

studentSchema.pre('save', function saveUser(next) {
    if (this.isNew) {
      const user = this;
      const SALT = bcrypt.genSaltSync(9);
      const hashedPassword = bcrypt.hashSync(user.password, SALT);
      user.password = hashedPassword;     
    }
    next();
  });

export default mongoose.model("Student", studentSchema);
