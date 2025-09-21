// File: controllers/walletController.js
import User from "../models/User.js";
import Entry from "../models/entryModel.js";
import Tournament from "../models/tournamentModel.js";
import Match from "../models/matchModel.js"; // ✅ match model import
import { autoScheduleMatch } from "./matchController.js";

// 🎯 Get Wallet Balance
export const getWalletBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ success: true, balance: user.walletBalance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🎯 Add Money to Wallet
export const addMoneyToWallet = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    const user = await User.findById(req.user._id);
    user.walletBalance += amount;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Money added successfully",
      balance: user.walletBalance,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🎯 Pay for Tournament and Join + Auto Schedule Match
export const payForTournament = async (req, res) => {
  try {
    const { tournamentId } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({ success: false, message: "Tournament not found" });
    }

    if (tournament.entryFee > user.walletBalance) {
      return res.status(400).json({ success: false, message: "Insufficient wallet balance" });
    }

    // Deduct wallet balance
    user.walletBalance -= tournament.entryFee;
    await user.save();

    // ✅ Create entry for user
    const entry = await Entry.create({
      tournament: tournamentId,
      player: userId,
      paymentStatus: "completed",
    });

    tournament.registeredPlayers.push(userId);
    await tournament.save();

    // ✅ Auto schedule match
    await autoScheduleMatch(tournamentId, userId);

    res.status(200).json({
      success: true,
      message: "Payment successful! Joined tournament and match scheduled.",
      entry,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🎯 Get My Matches
export const getMyMatches = async (req, res) => {
  try {
    const userId = req.user._id;

    const matches = await Match.find({ players: userId })
      .populate("players", "username email")
      .populate("tournament", "name");

    res.status(200).json({
      success: true,
      data: matches,
    });
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
