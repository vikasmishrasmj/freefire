import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    freefireId: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user && user._id) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData); // ✅ debug
    dispatch(registerUser(formData));
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <input
          type="text"
          name="phone"
          placeholder="Enter Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="freefireId"
          placeholder="Enter Free Fire ID"
          value={formData.freefireId}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
