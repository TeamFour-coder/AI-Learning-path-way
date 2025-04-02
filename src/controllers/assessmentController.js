import { createAssessmentService , getAllAssessmentsService, getAssessmentByIdService,
     updateAssessmentService, deleteAssessmentService} from "../services/assessmentService.js";


export const createAssessmentController = async (req, res) => {
    try {
        const assessment = await createAssessmentService(req.body, req.user);
        res.status(201).json(assessment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}; 

export const getAllAssessments = async (req, res) => {
    try {
        const assessments = await getAllAssessmentsService();
        res.status(200).json(assessments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAssessmentById = async (req, res) => {
    try {
        const assessment = await getAssessmentByIdService(req.params.id);
        if (!assessment) return res.status(404).json({ message: "Assessment not found" });
        res.status(200).json(assessment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateAssessment = async (req, res) => {
    try {
        const updatedAssessment = await updateAssessmentService(req.params.id, req.body);
        res.status(200).json({ message: "Assessment updated successfully", assessment: updatedAssessment });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteAssessment = async (req, res) => {
    try {
        await deleteAssessmentService(req.params.id);
        res.status(200).json({ message: "Assessment deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
