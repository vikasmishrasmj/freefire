import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema(
  {
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    kills: {
      type: Number,
      default: 0,
    },
    points: {
      type: Number,
      default: 0,
    },
    wins: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

leaderboardSchema.index({ tournament: 1, player: 1 }, { unique: true });

export default mongoose.model("Leaderboard", leaderboardSchema);
