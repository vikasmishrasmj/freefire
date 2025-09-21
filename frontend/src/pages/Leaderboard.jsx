import React from "react";
import "../style/LeaderboardPage.css";

const LeaderboardPage = () => {
  const players = [
    { rank: 1, name: "Vikas", score: 2560 },
    { rank: 2, name: "Amit", score: 2300 },
    { rank: 3, name: "Rahul", score: 2100 },
    { rank: 4, name: "Saurabh", score: 1980 },
    { rank: 5, name: "Rohit", score: 1870 },
  ];

  return (
    <div className="leaderboard-page">
      <header className="leaderboard-header">
        <h1>🏆 Leaderboard</h1>
        <p>Check out the top players and their scores</p>
      </header>

      <section className="leaderboard-table-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {players.map((p) => (
              <tr key={p.rank}>
                <td>{p.rank}</td>
                <td>{p.name}</td>
                <td>{p.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default LeaderboardPage;
