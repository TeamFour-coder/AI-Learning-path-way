import courseRepository from "../repository/courseRepository.js";

export const createCourse = async (data) => {
    return await courseRepository.create(data);
};

export const getAllCourses = async () => {
    return await courseRepository.getAll();
};

export const getCourseById = async (courseId) => {
    return await courseRepository.getById(courseId);
};

export const updateCourse = async (courseId, updateData) => {
    return await courseRepository.update(courseId, updateData);
};

export const deleteCourse = async (courseId) => {
    return await courseRepository.delete(courseId);
};
