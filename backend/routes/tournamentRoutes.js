import express from "express";
import {
  createTournament,
  getAllTournaments,
  joinTournament,
  getTournamentById,
  getMyTournaments,
} from "../controllers/tournamentController.js";
import { protect } from "../middlewares/auth.js";
import Match from "../models/matchModel.js";

const router = express.Router();

// Tournament Routes
router.post("/create", protect, createTournament);
router.get("/", getAllTournaments);
router.post("/join", protect, joinTournament);
router.get("/my", protect, getMyTournaments);
router.get("/:id", protect, getTournamentById);

// Tournament Matches
router.get("/:id/matches", protect, async (req, res) => {
  try {
    const matches = await Match.find({ tournament: req.params.id })
      .populate("players", "username freefireId")
      .populate("teams", "username freefireId")
      .populate("result.winner", "username freefireId")
      .populate("result.topPlayers", "username freefireId");

    res.status(200).json({ success: true, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
