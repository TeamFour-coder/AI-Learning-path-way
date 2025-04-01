import express from "express";
import studentRoutes from "./studentRoutes.js";
import courseRoutes from "./courseRoutes.js";
import assessmentRoutes from "./assementRoutes.js";
import questionRoutes from "./questionRoutes.js";

const router = express.Router();

router.use("/students", studentRoutes);
router.use("/courses", courseRoutes);
router.use("/assessments", assessmentRoutes);
router.use("/questions", questionRoutes);

export default router;
