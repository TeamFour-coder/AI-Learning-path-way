import express from "express";
import { createAssessmentController, getAllAssessments, getAssessmentById, updateAssessment, deleteAssessment } from "../controllers/assessmentController.js";

const router = express.Router();

router.post("/", createAssessmentController);
router.get("/", getAllAssessments);
router.get("/:id", getAssessmentById);
router.put("/:id", updateAssessment);
router.delete("/:id", deleteAssessment);

export default router;
