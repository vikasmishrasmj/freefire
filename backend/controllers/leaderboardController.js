import Leaderboard from "../models/leaderboardModel.js";
import Tournament from "../models/tournamentModel.js";
import { io } from "../server.js"; // ✅ import socket.io instance

// ✅ Auto-update leaderboard from match results
export const updateLeaderboard = async (tournamentId, result) => {
  try {
    const { winner, topPlayers } = result;

    if (winner) {
      await Leaderboard.findOneAndUpdate(
        { tournament: tournamentId, player: winner },
        { $inc: { wins: 1, points: 10 } },
        { upsert: true, new: true }
      );
    }

    if (topPlayers && topPlayers.length > 0) {
      for (const playerId of topPlayers) {
        await Leaderboard.findOneAndUpdate(
          { tournament: tournamentId, player: playerId },
          { $inc: { kills: 1, points: 5 } },
          { upsert: true, new: true }
        );
      }
    }

    // ✅ Notify frontend
    io.emit("leaderboardUpdated", { tournamentId });
  } catch (error) {
    console.error("Error updating leaderboard:", error);
  }
};

// ✅ Get leaderboard of a tournament
export const getLeaderboard = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    const leaderboard = await Leaderboard.find({ tournament: tournamentId })
      .populate("player", "username email")
      .sort({ points: -1, wins: -1, kills: -1 });

    res.json({
      success: true,
      data: leaderboard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Get user’s performance in a tournament
export const getMyPerformance = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    const performance = await Leaderboard.findOne({
      tournament: tournamentId,
      player: req.user._id,
    }).populate("player", "username email");

    res.json({
      success: true,
      data: performance || {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ NEW: Manual update leaderboard entry (Admin use)
export const manualUpdateLeaderboard = async (req, res) => {
  try {
    const { tournamentId, playerId } = req.params;
    const { kills, points, wins } = req.body;

    const updatedEntry = await Leaderboard.findOneAndUpdate(
      { tournament: tournamentId, player: playerId },
      { $set: { kills, points, wins } },
      { upsert: true, new: true }
    ).populate("player", "username email");

    // ✅ Notify frontend
    io.emit("leaderboardManuallyUpdated", updatedEntry);

    res.json({
      success: true,
      message: "Leaderboard entry updated manually",
      data: updatedEntry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
