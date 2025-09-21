import React, { useEffect, useState } from "react";
import api from "../services/api"; // ✅ axios instance
import "../style/Wallet.css";

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");

  // ✅ Fetch wallet balance
  const fetchBalance = async () => {
    try {
      const res = await api.get("/wallet"); // backend se call
      setBalance(res.data.balance);
    } catch (error) {
      console.error("Error fetching wallet:", error);
    }
  };

  // ✅ Add money
  const addMoney = async () => {
    try {
      const res = await api.post("/wallet/add", { amount: Number(amount) });
      alert(res.data.message);
      setBalance(res.data.balance);
      setAmount("");
    } catch (error) {
      console.error("Error adding money:", error);
      alert(error.response?.data?.message || "Failed to add money");
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="wallet-container">
      <h1>💰 My Wallet</h1>
      <div className="wallet-card">
        <h2>Current Balance: ₹{balance}</h2>

        <div className="wallet-actions">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={addMoney}>Add Money</button>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
