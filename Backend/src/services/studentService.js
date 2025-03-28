import studentRepository from "../repository/studentRepository.js";
import jwt from "jsonwebtoken";

export const registerStudent = async (data) => {
    const { email } = data;
    const existingStudent = await studentRepository.getByEmail(email);
    if (existingStudent) throw new Error("Email already registered");

    return await studentRepository.create(data);
};

export const loginStudent = async (email, password) => {
    const student = await studentRepository.getByEmail(email);
    if (!student) throw new Error("Invalid email or password");

    const token = jwt.sign({ id: student._id, email: student.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return { student, token };
};

export const getStudentById = async (studentId) => {
    return await studentRepository.getById(studentId);
};

export const enrollInCourse = async (studentId, courseId) => {
    return await studentRepository.enrollCourse(studentId, courseId);
};
