import express from "express";
import { protect } from "../middlewares/auth.js";
import { 
  createMatch, 
  getTournamentMatches, 
  updateMatchResult, 
  getMyMatchesByTournament 
} from "../controllers/matchController.js";

const router = express.Router();

// 🎯 Match Routes
router.post("/create", protect, createMatch);                   // ✅ manual schedule (optional)
router.get("/:tournamentId", protect, getTournamentMatches);    // ✅ get all matches of a tournament
router.get("/mymatches/:tournamentId", protect, getMyMatchesByTournament); // ✅ user-specific matches
router.put("/result/:matchId", protect, updateMatchResult);     // ✅ update match result

export default router;
