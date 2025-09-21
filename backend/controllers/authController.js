import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import jwt from "jsonwebtoken";

// token generate helper
function generateToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// @desc Register new user
// @route POST /api/auth/register
export async function register(req, res) {
  try {
    const { username, email, password, phone, freefireId } = req.body;

    // check existing
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
      freefireId,
    });

    return res.status(201).json({
      token: generateToken(user),
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        freefireId: user.freefireId,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}

// @desc Login user
// @route POST /api/auth/login
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    return res.json({
      token: generateToken(user),
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        freefireId: user.freefireId,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}
