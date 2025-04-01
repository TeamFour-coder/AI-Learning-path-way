import assessmentRepository from "../repository/assessmentRepository.js";

export const createAssessmentService = async (data) => {
    return await assessmentRepository.create(data);
};

export const getAssessmentByIdService = async (assessmentId) => {
    return await assessmentRepository.getById(assessmentId);
};

export const getAllAssessmentsService = async () => {
    return await assessmentRepository.getAll();
};

export const updateAssessmentService = async (assessmentId, updateData) => {
    return await assessmentRepository.update(assessmentId, updateData);
};

export const deleteAssessmentService = async (assessmentId) => {
    return await assessmentRepository.delete(assessmentId);
};
