// pages/Dashboard.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";
import HomePage from "./HomePage.jsx";
import TournamentPage from "./TournamentPage.jsx";
import MatchPage from "./MatchPage.jsx";
import Leaderboard from "./Leaderboard.jsx";
import Profile from "./Profile.jsx";
import PaymentPage from "./PaymentPage.jsx";
import MyMatchesPage from "./MyMatchesPage.jsx"; // ✅ sahi import

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tournaments" element={<TournamentPage />} />
          <Route path="/matches" element={<MatchPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment/:id" element={<PaymentPage />} />
          <Route path="/mymatches/:id" element={<MyMatchesPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
