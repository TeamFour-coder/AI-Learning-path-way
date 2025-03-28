import questionRepository from "../repository/questionRepository.js";

export const createQuestion = async (data) => {
    return await questionRepository.create(data);
};

export const getQuestionById = async (questionId) => {
    return await questionRepository.getById(questionId);
};

export const getAllQuestions = async () => {
    return await questionRepository.getAll();
};

export const updateQuestion = async (questionId, updateData) => {
    return await questionRepository.update(questionId, updateData);
};

export const deleteQuestion = async (questionId) => {
    return await questionRepository.delete(questionId);
};
