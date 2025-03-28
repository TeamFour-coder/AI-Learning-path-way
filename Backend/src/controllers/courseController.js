import * as courseService from "../services/courseService.js";

export const createCourse = async (req, res) => {
    try {
        const course = await courseService.createCourse(req.body);
        res.status(201).json({ message: "Course created successfully", course });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllCourses = async (req, res) => {
    try {
        const courses = await courseService.getAllCourses();
        res.status(200).json(courses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const course = await courseService.getCourseById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.status(200).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const updatedCourse = await courseService.updateCourse(req.params.id, req.body);
        res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        await courseService.deleteCourse(req.params.id);
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
