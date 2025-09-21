import Tournament from "../models/tournamentModel.js";
import Entry from "../models/entryModel.js";
import Match from "../models/matchModel.js";
import { autoScheduleMatch } from "./matchController.js"; // ✅ import auto schedule

// 🎯 Create Tournament
export const createTournament = async (req, res) => {
  try {
    const tournament = new Tournament({
      ...req.body,
      createdBy: req.user._id,
    });

    await tournament.save();

    res.status(201).json({
      success: true,
      message: "Tournament created successfully",
      data: tournament,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 🎯 Get All Tournaments
export const getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find().populate("registeredPlayers");
    res.status(200).json({ success: true, data: tournaments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🎯 Join Tournament
export const joinTournament = async (req, res) => {
  try {
    const { tournamentId } = req.body;
    const userId = req.user._id;

    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ success: false, message: "Tournament not found" });
    }

    const alreadyJoined = await Entry.findOne({ tournament: tournamentId, player: userId });
    if (alreadyJoined) {
      return res.status(400).json({ success: false, message: "Already joined" });
    }

    if (tournament.registeredPlayers.length >= tournament.maxPlayers) {
      return res.status(400).json({ success: false, message: "Tournament is full" });
    }

    // ✅ Entry create
    const entry = new Entry({
      tournament: tournamentId,
      player: userId,
      paymentStatus: "completed",
    });
    await entry.save();

    tournament.registeredPlayers.push(userId);
    await tournament.save();

    // ✅ Auto schedule match for this user
    await autoScheduleMatch(tournamentId, userId);

    res.status(201).json({
      success: true,
      message: "Joined successfully",
      data: entry,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🎯 Get Tournament by ID
export const getTournamentById = async (req, res) => {
  try {
    const { id } = req.params;

    const tournament = await Tournament.findById(id).populate(
      "registeredPlayers",
      "username email"
    );

    if (!tournament) {
      return res.status(404).json({ success: false, message: "Tournament not found" });
    }

    res.status(200).json({ success: true, data: tournament });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🎯 My Tournaments
export const getMyTournaments = async (req, res) => {
  try {
    const entries = await Entry.find({ player: req.user._id })
      .populate("tournament")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: entries.map((e) => e.tournament),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
