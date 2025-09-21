import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TournamentCard from "../components/TournamentCard";
import "../style/TournamentPage.css";

const TournamentPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const fetchTournaments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tournaments");
      setTournaments(res.data.data);
    } catch (err) {
      console.error("Error fetching tournaments:", err);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  const handleJoin = async (tournament) => {
    if (!user) return alert("Please login to join the tournament");

    // ✅ Navigate to payment page (update: payment + auto match scheduling)
    navigate(`/payment/${tournament._id}`);
  };

  return (
    <div className="tournament-page">
      <header className="tournament-header">
        <h1>🎮 Tournaments</h1>
        <p>Join exciting tournaments and win prizes!</p>
      </header>

      <section className="tournament-list">
        {tournaments.length > 0 ? (
          tournaments.map((t) => (
            <TournamentCard
              key={t._id}
              tournament={t}
              onJoin={() => handleJoin(t)}
              user={user}
            />
          ))
        ) : (
          <p>No tournaments available</p>
        )}
      </section>
    </div>
  );
};

export default TournamentPage;
