import express from "express";
import { createAssessmentController } from "../controllers/assessmentController.js";
import { createCourseController } from "../controllers/courseController.js";
import { authenticateUser, authorizeAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/assessments", authenticateUser, authorizeAdmin, createAssessmentController);
router.post("/courses", authenticateUser, authorizeAdmin, createCourseController);

export default router;
