import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import passport from "./src/config/passport.js";
import userRoutes from "./src/routes/userRoutes.js";
import leaderboardRoutes from "./src/routes/leaderboardRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
// Session is required for Passport to maintain the OAuth state during the redirect flow
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
// Test route
app.get("/", (req, res) => {
  res.send("Runiverse Backend is live");
});
// MongoDB connection
mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
