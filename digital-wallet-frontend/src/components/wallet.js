import React, { useState, useEffect } from "react";
import { getUsername } from "../utils/auth";
import { getWalletBalance, depositMoney, withdrawMoney } from "../api/api";
import "bootstrap/dist/css/bootstrap.min.css";

const Wallet = () => {
  const username = getUsername();
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");

  const fetchBalance = async () => {
    try {
      const res = await getWalletBalance(username);
      const bal = parseFloat(res.data.split(":")[1]);
      setBalance(bal);
    } catch (err) {
      console.error("Error fetching balance:", err);
      alert("Failed to fetch wallet balance.");
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const handleDeposit = async () => {
    if (!amount) {
      alert("Please enter an amount to deposit.");
      return;
    }
    try {
      await depositMoney(username, parseFloat(amount));
      alert(`Successfully deposited ${amount}.`);
      setAmount("");
      fetchBalance();
    } catch (err) {
      console.error("Deposit error:", err);
      alert("Deposit failed. Please try again.");
    }
  };

  const handleWithdraw = async () => {
    if (!amount) {
      alert("Please enter an amount to withdraw.");
      return;
    }
    try {
      await withdrawMoney(username, parseFloat(amount));
      alert(`Successfully withdrew ${amount}.`);
      setAmount("");
      fetchBalance();
    } catch (err) {
      console.error("Withdraw error:", err);
      alert("Withdraw failed. Please check your balance and try again.");
    }
  };

  return (
    <div className="container py-5 mt-5">
      <h2 className="text-center text-success mb-4">Wallet</h2>

      <p className="text-center fs-5">
        Balance: <span className="fw-bold text-success">{balance}</span>
      </p>

      <div className="mb-3">
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="d-flex gap-2">
          <button className="btn btn-success w-50" onClick={handleDeposit}>
            Deposit
          </button>
          <button className="btn btn-danger w-50" onClick={handleWithdraw}>
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
