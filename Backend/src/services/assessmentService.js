import assessmentRepository from "../repository/assessmentRepository.js";

export const createAssessment = async (data) => {
    return await assessmentRepository.create(data);
};

export const getAssessmentById = async (assessmentId) => {
    return await assessmentRepository.getById(assessmentId);
};

export const getAllAssessments = async () => {
    return await assessmentRepository.getAll();
};

export const updateAssessment = async (assessmentId, updateData) => {
    return await assessmentRepository.update(assessmentId, updateData);
};

export const deleteAssessment = async (assessmentId) => {
    return await assessmentRepository.delete(assessmentId);
};
