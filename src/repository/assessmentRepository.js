import Assessment from "../models/assessmentModel.js";
import crudRepository from "./crudRepository.js";

const assessmentRepository = {
  ...crudRepository(Assessment), // Inherit basic CRUD operations

  getByStudentId: async function (studentId) {
    return await Assessment.find({ student: studentId }).populate("questions");
  },

  updateScore: async function (assessmentId, score) {
    return await Assessment.findByIdAndUpdate(
      assessmentId,
      { score },
      { new: true }
    );
  },
};

export default assessmentRepository;
