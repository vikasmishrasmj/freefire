import express from "express";
import { protect } from "../middlewares/auth.js";
import {
  getLeaderboard,
  getMyPerformance,
  manualUpdateLeaderboard,
} from "../controllers/leaderboardController.js";

const router = express.Router();

// ✅ Leaderboard routes
router.get("/:tournamentId", protect, getLeaderboard);        // Full leaderboard
router.get("/:tournamentId/me", protect, getMyPerformance);   // My performance

// ✅ NEW: Manual update (Admin only ideally, but abhi protect hi rakha hai)
router.put("/:tournamentId/:playerId", protect, manualUpdateLeaderboard);

export default router;
