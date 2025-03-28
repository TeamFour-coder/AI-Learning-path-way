import * as questionService from "../services/questionService.js";

export const createQuestion = async (req, res) => {
    try {
        const question = await questionService.createQuestion(req.body);
        res.status(201).json({ message: "Question created successfully", question });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllQuestions = async (req, res) => {
    try {
        const questions = await questionService.getAllQuestions();
        res.status(200).json(questions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getQuestionById = async (req, res) => {
    try {
        const question = await questionService.getQuestionById(req.params.id);
        if (!question) return res.status(404).json({ message: "Question not found" });
        res.status(200).json(question);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateQuestion = async (req, res) => {
    try {
        const updatedQuestion = await questionService.updateQuestion(req.params.id, req.body);
        res.status(200).json({ message: "Question updated successfully", question: updatedQuestion });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteQuestion = async (req, res) => {
    try {
        await questionService.deleteQuestion(req.params.id);
        res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
