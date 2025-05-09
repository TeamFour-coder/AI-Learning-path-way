import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { Admin } from "./models/AdminModel.js";
import adminRouter from "./routes/adminRoutes.js";
import fs from "fs";
import csvParser from "csv-parser";
import axios from "axios";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api", routes);
app.use("/admin", adminRouter);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    createAdmin(); // Call the createAdmin function after successful connection
  })
  .catch((err) => console.log("❌ MongoDB connection error:", err));

const createAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: "admin@gmail.com" });
    if (existingAdmin) {
      console.log("✅ Admin already exists");
      return;
    }

    const admin = new Admin({
      email: "admin@gmail.com",
      password: "CollegeProject@26",
      name: "Super Admin", // Adding a default name
    });

    await admin.save();
    console.log("✅ Admin created successfully");
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
  }
};

// app.get("/api/quiz/:subject", (req, res) => {
//   const { subject } = req.params;
//   const { difficulty } = req.query; // Get difficulty from query parameter

//   const fileMap = {
//     maths: "data/output/maths_quiz.csv",
//     physics: "data/output/physics_quiz.csv",
//     chemistry: "data/output/chemistry_quiz.csv",
//   };

//   const filePath = fileMap[subject];
//   if (!filePath || !fs.existsSync(filePath)) {
//     return res.status(404).json({ error: "Quiz data not found" });
//   }

//   const results = [];
//   fs.createReadStream(filePath)
//     .pipe(csvParser())
//     .on("data", (data) => {
//       // Filter by difficulty if specified
//       if (!difficulty || data["Difficulty Level"] === difficulty) {
//         console.log("Difficulty:",data["Difficulty Level"]);

//         results.push(data);
//       }
//     })
//     .on("end", () => {
//       // Randomize and limit to 50 questions
//       const shuffled = results.sort(() => 0.5 - Math.random());
//       res.json(shuffled.slice(0, 50));
//     })
//     .on("error", (err) => res.status(500).json({ error: "Error reading file" }));
// });

app.get("/api/quiz/:subject", (req, res) => {
  const { subject } = req.params;
  const { difficulty } = req.query;

  const fileMap = {
    maths: "data/output/maths_quiz.csv",
    physics: "data/output/physics_quiz.csv",
    chemistry: "data/output/chemistry_quiz.csv",
  };

  const filePath = fileMap[subject];
  if (!filePath || !fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Quiz data not found" });
  }

  const difficultyMap = {
    Easy: "0",
    Medium: "1",
    Hard: "2",
    0: "0",
    1: "1",
    2: "2",
  };

  const results = [];
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (data) => {
      const rawLevel = data["Difficulty Level"]?.trim();

      // Ignore empty or unknown difficulty levels
      if (!rawLevel || rawLevel.toLowerCase() === "not specified") {
        console.warn("Skipping question with undefined difficulty:", rawLevel);
        return;
      }

      const normalizedLevel = difficultyMap[rawLevel];
      if (!normalizedLevel) {
        console.warn("Unrecognized difficulty in CSV:", rawLevel);
        return;
      }

      data["Difficulty Level"] = normalizedLevel;
      results.push(data);

      if (!normalizedLevel) {
        console.warn("Unrecognized difficulty in CSV:", rawLevel);
        return;
      }

      if (!difficulty || difficulty === normalizedLevel) {
        data["Difficulty Level"] = normalizedLevel;
        results.push(data);
      }
    })
    .on("end", () => {
      const shuffled = results.sort(() => 0.5 - Math.random());
      res.json(shuffled.slice(0, 50));
    })
    .on("error", (err) =>
      res.status(500).json({ error: "Error reading file" })
    );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
