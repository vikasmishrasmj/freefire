import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../style/MyMatchPage.css";

const MyMatchesPage = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyMatches = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/wallet/mymatches`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMatches(res.data.data);
      } catch (err) {
        console.error("Error fetching matches:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyMatches();
  }, [token, user._id]);

  if (loading) return <div className="matches-page"><p>Loading your matches...</p></div>;

  return (
    <div className="matches-page">
      <h1>My Matches</h1>
      {matches.length > 0 ? (
        <div className="matches-grid">
          {matches.map((match, index) => (
            <div key={match._id} className="match-card">
              <p><strong>Match:</strong> {match.title || match._id}</p>
              <p>
                <strong>Status:</strong> {match.status}
                <span className={`status-badge status-${match.status.toLowerCase()}`}>
                  {match.status}
                </span>
              </p>
              <p>
                <strong>Players:</strong>{" "}
                {match.players?.map((p) => p.username).join(", ")}
              </p>
              {match.result?.winner && (
                <p><strong>Winner:</strong> {match.result.winner.username}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No matches available yet. Join a tournament first!</p>
      )}
    </div>
  );
};

export default MyMatchesPage;