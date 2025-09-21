import Match from "../models/matchModel.js";
import Tournament from "../models/tournamentModel.js";
import Leaderboard from "../models/leaderboardModel.js";
import { io } from "../server.js"; // ✅ import socket.io instance

// 📌 Helper Function → Update Leaderboard
const updateLeaderboard = async (tournamentId, result) => {
  try {
    if (result.winner) {
      await Leaderboard.findOneAndUpdate(
        { tournament: tournamentId, player: result.winner },
        { $inc: { points: 10, wins: 1 } },
        { upsert: true, new: true }
      );
    }

    if (result.topPlayers && result.topPlayers.length > 0) {
      for (let playerId of result.topPlayers) {
        await Leaderboard.findOneAndUpdate(
          { tournament: tournamentId, player: playerId },
          { $inc: { kills: 1, points: 5 } },
          { upsert: true, new: true }
        );
      }
    }
  } catch (error) {
    console.error("Leaderboard update error:", error.message);
  }
};

// 🎯 Auto Create/Update Match when player joins
export const autoScheduleMatch = async (tournamentId, userId) => {
  try {
    let match = await Match.findOne({ tournament: tournamentId, status: "upcoming" });

    if (!match) {
      const tournament = await Tournament.findById(tournamentId);
      match = new Match({
        tournament: tournamentId,
        title: `${tournament.title} - Match 1`,
        mode: "squad",
        scheduledTime: tournament.startTime,
        players: [userId],
      });
    } else {
      if (!match.players.includes(userId)) {
        match.players.push(userId);
      }
    }

    await match.save();

    // ✅ Notify frontend via socket
    io.emit("matchUpdated", match);

    return match;
  } catch (error) {
    console.error("Auto scheduling error:", error.message);
    throw error;
  }
};

// 🎯 Manual Create/Schedule a Match
export const createMatch = async (req, res) => {
  try {
    const { tournamentId, title, mode, scheduledTime, players } = req.body;

    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ success: false, message: "Tournament not found" });
    }

    const match = new Match({
      tournament: tournamentId,
      title,
      mode,
      scheduledTime,
      players,
    });

    await match.save();

    // ✅ Notify frontend
    io.emit("matchCreated", match);

    res.status(201).json({ success: true, message: "Match scheduled successfully", data: match });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 🎯 Get Matches of a Tournament
export const getTournamentMatches = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    const matches = await Match.find({ tournament: tournamentId })
      .populate("players", "username freefireId")
      .populate("result.winner", "username freefireId")
      .populate("result.topPlayers", "username freefireId");

    res.status(200).json({ success: true, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🎯 Get My Matches for a Tournament
export const getMyMatchesByTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const userId = req.user._id;

    const matches = await Match.find({ 
      tournament: tournamentId,
      players: userId
    })
      .populate("players", "username freefireId")
      .populate("result.winner", "username freefireId")
      .populate("result.topPlayers", "username freefireId");

    if (!matches || matches.length === 0) {
      return res.status(200).json({ success: true, data: [], message: "No matches found for this user in the tournament" });
    }

    res.status(200).json({ success: true, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🎯 Update Match Result
export const updateMatchResult = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { winner, topPlayers, status } = req.body;

    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ success: false, message: "Match not found" });
    }

    match.result = { winner, topPlayers };
    if (status) match.status = status;

    await match.save();
    await updateLeaderboard(match.tournament, match.result);

    // ✅ Notify all clients
    io.emit("matchResultUpdated", match);

    res.status(200).json({ success: true, message: "Match result updated", data: match });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
