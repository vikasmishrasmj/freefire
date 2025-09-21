import React from "react";
import "../style/HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="hero-section">
        <h1>Welcome to GameHub</h1>
        <p>Your one-stop platform for tournaments and matches.</p>
      </header>

      <section className="features">
        <div className="feature-card">
          <h3>Fast</h3>
          <p>Experience lightning fast performance with our services.</p>
        </div>
        <div className="feature-card">
          <h3>Secure</h3>
          <p>We prioritize your security with top-notch practices.</p>
        </div>
        <div className="feature-card">
          <h3>Reliable</h3>
          <p>Count on us for 24/7 support and uptime guarantee.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
