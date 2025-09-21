import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    freefireId: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["player", "admin"], // ✅ player ya admin hi hoga
      default: "player",
    },
    wallet: {
      type: Number,
      default: 0, // 💰 default balance
    },
  },
  { timestamps: true }
);

// password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model("User", userSchema);
