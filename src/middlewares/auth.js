import jwt from "jsonwebtoken";
import Student from "../models/StudentModel.js";

export const authenticateUser = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Student.findById(verified.id);
        if (!req.user) return res.status(404).json({ error: "User not found" });
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid Token" });
    }
};

// Middleware to check if user is admin
export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== "admin") return res.status(403).json({ error: "Access Denied: Admins only" });
    next();
};
