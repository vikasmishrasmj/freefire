import express from "express";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

// Example: Get logged-in user profile
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "User profile data",
    user: req.user,
  });
});

export default router;
