import * as studentService from "../services/studentService.js";

export const registerStudent = async (req, res) => {
    try {
        const student = await studentService.registerStudent(req.body);
        res.status(201).json({ message: "Student registered successfully", student });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await studentService.loginStudent(email, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

export const getStudentById = async (req, res) => {
    try {
        const student = await studentService.getStudentById(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const enrollInCourse = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;
        const updatedStudent = await studentService.enrollInCourse(studentId, courseId);
        res.status(200).json({ message: "Enrolled successfully", student: updatedStudent });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
