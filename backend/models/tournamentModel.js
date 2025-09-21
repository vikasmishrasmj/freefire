import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Tournament title is required"],
      trim: true,
    },
    game: {
      type: String,
      default: "Free Fire",
    },
    entryFee: {
      type: Number,
      required: [true, "Entry fee is required"],
    },
    maxPlayers: {
      type: Number,
      required: [true, "Max players is required"],
    },
    // 🎯 Tournament type: FreeForAll, TeamBattle, Knockout
    type: {
      type: String,
      enum: ["freeForAll", "teamBattle", "knockout"],
      required: true,
    },
    teamSize: {
      type: Number,
      default: 1, // only used for teamBattle
    },
    prizes: {
      first: { type: Number, default: 0 },
      second: { type: Number, default: 0 },
      third: { type: Number, default: 0 },
    },
    registeredPlayers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },
    startTime: {
      type: Date,
      required: [true, "Start time is required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tournament", tournamentSchema);
