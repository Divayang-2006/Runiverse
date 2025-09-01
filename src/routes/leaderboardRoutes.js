import express from "express";
import {
  getLeaderboardByDistance,
  getLeaderboardByTerritories,
} from "../controllers/leaderboardController.js";
const router = express.Router();
// Leaderboards
router.get("/distance", getLeaderboardByDistance);
router.get("/territories", getLeaderboardByTerritories);

export default router;
