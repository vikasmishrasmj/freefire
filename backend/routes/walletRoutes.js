import express from "express";
import { protect } from "../middlewares/auth.js";
import { 
  getWalletBalance, 
  addMoneyToWallet, 
  payForTournament, 
  getMyMatches // ✅ new controller
} from "../controllers/walletController.js";

const router = express.Router();

router.get("/", protect, getWalletBalance);
router.post("/add", protect, addMoneyToWallet);
router.post("/pay", protect, payForTournament);

// ✅ New route for my matches
router.get("/mymatches", protect, getMyMatches);

export default router;
