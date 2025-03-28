import express from "express";
import {registerStudent, loginStudent , getStudentById , enrollInCourse} from "../controllers/studentController.js";

const router = express.Router();

router.post("/register",registerStudent);
router.post("/login", loginStudent);
router.get("/:id", getStudentById);
router.post("/enroll", enrollInCourse);

export default router;
