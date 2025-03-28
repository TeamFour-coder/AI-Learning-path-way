import * as assessmentService from "../services/assessmentService.js";

export const createAssessment = async (req, res) => {
    try {
        const assessment = await assessmentService.createAssessment(req.body);
        res.status(201).json({ message: "Assessment created successfully", assessment });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllAssessments = async (req, res) => {
    try {
        const assessments = await assessmentService.getAllAssessments();
        res.status(200).json(assessments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAssessmentById = async (req, res) => {
    try {
        const assessment = await assessmentService.getAssessmentById(req.params.id);
        if (!assessment) return res.status(404).json({ message: "Assessment not found" });
        res.status(200).json(assessment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateAssessment = async (req, res) => {
    try {
        const updatedAssessment = await assessmentService.updateAssessment(req.params.id, req.body);
        res.status(200).json({ message: "Assessment updated successfully", assessment: updatedAssessment });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteAssessment = async (req, res) => {
    try {
        await assessmentService.deleteAssessment(req.params.id);
        res.status(200).json({ message: "Assessment deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
