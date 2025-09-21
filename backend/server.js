import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

// routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import tournamentRoutes from "./routes/tournamentRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS middleware for axios requests
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true,
}));

// middleware
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/matches", matchRoutes);   // ✅ match routes
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/wallet", walletRoutes);   // ✅ wallet routes

// simple test route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// ✅ Create HTTP server & bind with Socket.io
const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket.io connection
io.on("connection", (socket) => {
  console.log(`⚡ New client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// start server after DB connect
connectDB(process.env.MONGODB_URI).then(() => {
  httpServer.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT}`)
  );
});
