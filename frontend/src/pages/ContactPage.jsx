import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../style/ContactPage.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}, we have received your message!`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <Navbar />

      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>We would love to hear from you!</p>
      </header>

      <section className="contact-section">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default ContactPage;
