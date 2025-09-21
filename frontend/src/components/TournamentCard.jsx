import React from "react";
import "../style/TournamentPage.css";

const TournamentCard = ({ tournament, onJoin, user }) => {
  return (
    <div className="tournament-card">
      <h2>{tournament.title}</h2>
      <p><strong>Game:</strong> {tournament.game}</p>
      <p><strong>Entry Fee:</strong> ₹{tournament.entryFee}</p>
      <p><strong>Max Players:</strong> {tournament.maxPlayers}</p>
      <p><strong>Players Joined:</strong> {tournament.registeredPlayers?.length || 0}</p>
      <p><strong>Type:</strong> {tournament.type}</p>
      <p>
        <strong>Status:</strong>{" "}
        <span className={`status ${tournament.status}`}>{tournament.status}</span>
      </p>
      <p><strong>Start Time:</strong> {new Date(tournament.startTime).toLocaleString()}</p>

      {user ? (
        <button className="join-btn" onClick={onJoin}>Join Now</button>
      ) : (
        <p>Please login to join</p>
      )}
    </div>
  );
};

export default TournamentCard;
