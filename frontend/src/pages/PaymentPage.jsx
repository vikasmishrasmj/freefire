import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "../style/PaymentPage.css";

const PaymentPage = () => {
  const { id } = useParams(); // tournamentId
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tournaments/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTournament(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTournament();
  }, [id, token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/wallet/pay", // ✅ backend payForTournament function
        { tournamentId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);

      // ✅ Navigate to MyMatchesPage after payment (auto match created in backend)
      navigate(`/mymatches/${id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (!tournament) return <p>Loading...</p>;

  return (
    <div className="payment-page">
      <h1>Payment for {tournament.title}</h1>
      <p>Entry Fee: ₹{tournament.entryFee}</p>

      <div className="qr-code">
        <img src="/images/QR.jpeg" alt="Pay via QR Code" />
        <p>Scan this QR code to pay (simulated)</p>
      </div>

      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Confirm Payment & Join Tournament"}
      </button>
    </div>
  );
};

export default PaymentPage;
