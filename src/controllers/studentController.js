import {
    registerStudentService,
    getStudentById as getStudentByIdService,
    loginStudentService,
    enrollInCourse as enrollInCourseService,
    updateStudentPerformance as updateStudentPerformanceService
} from "../services/studentService.js";

export const registerStudentController = async (req, res) => {
    try {
        
        console.log(req.body);
        
        const student = await registerStudentService(req.body);
        res.status(201).json({ message: "Student registered successfully", student });
    } catch (error) {
        console.error("❌ Error in registerStudent Controller:", error);
        res.status(400).json({ error: error.message });

    }
};

export const loginStudent = async (req, res) => {
    try {
        console.log(req.body);
        
        const { email, password } = req.body;
        const result = await loginStudentService(email, password);
        res.
        status(200)
        .json({ message: "Student logged in successfully", result });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

export const getStudentById = async (req, res) => {
    try {
        const student = await getStudentByIdService(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const enrollInCourse = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;
        const updatedStudent = await enrollInCourseService(studentId, courseId);
        res.status(200).json({ message: "Enrolled successfully", student: updatedStudent });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getStudentDashboard = async (req, res) => {
    try {
        const student = await getStudentByIdService(req.user.id);
        if (!student) return res.status(404).json({ error: "Student not found" });

        res.status(200).json({
            name: student.name,
            email: student.email,
            subjectPerformance: student.subjectPerformance
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateStudentPerformanceController = async (req, res) => {
    try {
        const { studentId, subject, score } = req.body;
        const updatedStudent = await updateStudentPerformanceService(studentId, subject, score);
        res.status(200).json({ message: "Performance updated successfully", student: updatedStudent });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
