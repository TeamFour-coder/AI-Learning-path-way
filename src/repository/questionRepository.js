import Question from "../models/QuestionModel.js";
import crudRepository from "./crudRepository.js";

const questionRepository = {
  ...crudRepository(Question), // Inherit basic CRUD operations

  getByCourseId: async function (courseId) {
    return await Question.find({ course: courseId });
  },

  getByDifficulty: async function (difficultyLevel) {
    return await Question.find({ difficulty: difficultyLevel });
  },
};

export default questionRepository;
