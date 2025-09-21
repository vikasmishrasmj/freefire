// App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import MyMatchesPage from "./pages/MyMatchesPage.jsx"; // ✅ sahi import

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard/*"
        element={user ? <Dashboard /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/payment/:id"
        element={user ? <PaymentPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/mymatches/:id"
        element={user ? <MyMatchesPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="*"
        element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}

export default App;
