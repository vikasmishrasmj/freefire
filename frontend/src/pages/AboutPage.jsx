import React from "react";
import Navbar from "../components/Navbar";
import "../style/AboutPage.css";  // 👈 AboutPage CSS import

const AboutPage = () => {
  return (
    <div className="about-page">
      <Navbar />

      <header className="about-header">
        <h1>About Us</h1>
        <p>Learn more about our mission, vision, and values.</p>
      </header>

      <section className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to deliver high-quality, scalable, and reliable
            solutions that help people achieve more every day.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Vision</h2>
          <p>
            To become the leading platform that empowers businesses and
            individuals through technology.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Values</h2>
          <ul>
            <li>Integrity</li>
            <li>Innovation</li>
            <li>Customer First</li>
            <li>Excellence</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
