import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    title: {
      type: String,
      required: true, // e.g. "Match 1"
    },
    mode: {
      type: String,
      enum: ["solo", "duo", "squad"],
      default: "squad",
    },
    scheduledTime: {
      type: Date,
      required: true,
    },
    // 🎯 for knockout tournaments
    round: {
      type: String,
      enum: ["round1", "quarter", "semi", "final"],
      default: "round1",
    },
    // 🎯 for team battles
    teams: [
      [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    ],
    players: [
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
    result: {
      winner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      topPlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Match", matchSchema);
