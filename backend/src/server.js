import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { Admin } from "./models/AdminModel.js";
import adminRouter from "./routes/adminRoutes.js";
import fs from "fs";
import csvParser from "csv-parser";

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

  app.get("/api/quiz/:subject", (req, res) => {
    const { subject } = req.params;
    const fileMap = {
      maths: "data/output/maths_quiz.csv",
      physics: "data/output/physics_quiz.csv",
      chemistry: "data/output/chemistry_quiz.csv",
    };
  
    const filePath = fileMap[subject];
    if (!filePath || !fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Quiz data not found" });
    }
  
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => res.json(results))
      .on("error", (err) => res.status(500).json({ error: "Error reading file" }));
  });
  

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
