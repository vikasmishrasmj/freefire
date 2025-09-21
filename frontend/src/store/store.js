// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
//import tournamentsReducer from "../features/tournaments/tournamentsSlice.js"; // will create later
//import matchesReducer from "../features/matches/matchesSlice.js"; // later
//import leaderboardReducer from "../features/leaderboard/leaderboardSlice.js"; // later

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // tournaments: tournamentsReducer,
    // matches: matchesReducer,
    // leaderboard: leaderboardReducer,
  },
});

export default store;
