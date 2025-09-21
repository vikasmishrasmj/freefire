import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/MatchPage.css";

const MatchPage = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/matches");
        setMatches(res.data.data);
      } catch (err) {
        console.error("Error fetching matches:", err);
      }
    };
    fetchMatches();
  }, []);

  return (
    <div className="matches-page">
      <h1>All Matches</h1>
      {matches.length > 0 ? (
        matches.map((match) => (
          <div key={match._id} className="match-card">
            <p><strong>Match:</strong> {match.title || match._id}</p>
            <p><strong>Status:</strong> {match.status}</p>
            <p><strong>Tournament:</strong> {match.tournament?.title}</p>
            <p><strong>Players:</strong> {match.players?.map(p => p.username).join(", ")}</p>
            {match.result?.winner && <p><strong>Winner:</strong> {match.result.winner.username}</p>}
          </div>
        ))
      ) : (
        <p>No matches available yet.</p>
      )}
    </div>
  );
};

export default MatchPage;
