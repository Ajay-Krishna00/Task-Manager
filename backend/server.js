// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"; // ✅ Add this line
import { fileURLToPath } from "url"; // ✅ Required in ES modules for __dirname
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import handler from "./routes/ping.js";

// Load environment variables
dotenv.config();

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.get("/ping", handler);
app.use("/", taskRoutes);

// ✅ Serve static files from React (e.g., /build folder from React app)
app.use(express.static(path.join(__dirname, "build")));

// ✅ Catch-all to support React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
