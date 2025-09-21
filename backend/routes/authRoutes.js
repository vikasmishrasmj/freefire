import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// @route   POST /api/v1/auth/register
// @desc    Register new user
router.post("/register", register);

// @route   POST /api/v1/auth/login
// @desc    Login user
router.post("/login", login);

export default router;
