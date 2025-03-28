import express from "express";
import { createAssessment, getAllAssessments, getAssessmentById, updateAssessment, deleteAssessment } from "../controllers/assessmentController.js";

const router = express.Router();

router.post("/", createAssessment);
router.get("/", getAllAssessments);
router.get("/:id", getAssessmentById);
router.put("/:id", updateAssessment);
router.delete("/:id", deleteAssessment);

export default router;
