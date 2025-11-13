import React, { useState, useEffect } from "react";
import { getUsername } from "../utils/auth";
import { getTransactions, transferMoney } from "../api/api";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Transactions = () => {
  const username = getUsername();
  const [transactions, setTransactions] = useState([]);
  const [toUser, setToUser] = useState("");
  const [amount, setAmount] = useState("");

  // Fetch existing transactions
  const fetchTransactions = async () => {
    try {
      const res = await getTransactions(username);
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch transactions.");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Check if recipient exists
  const checkUserExists = async (recipient) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/authentication/getUsers/${recipient}`);
      return res.data.exists; // backend should return { exists: true/false }
    } catch (err) {
      console.error("Error checking user:", err);
      return false;
    }
  };

  // Handle money transfer
  const handleTransfer = async () => {
    if (!toUser || !amount) {
      alert("Please enter both recipient and amount.");
      return;
    }

    if (toUser === username) {
      alert("You cannot transfer money to yourself.");
      return;
    }

    if (parseFloat(amount) <= 0) {
      alert("Amount must be greater than zero.");
      return;
    }

    const userExists = await checkUserExists(toUser);
    if (!userExists) {
      alert("Recipient username does not exist.");
      return;
    }

    try {
      await transferMoney(username, toUser, parseFloat(amount));
      alert(`Successfully transferred ${amount} to ${toUser}.`);
      setToUser("");
      setAmount("");
      fetchTransactions();
    } catch (err) {
      console.error("Transfer error:", err);
      alert(err.response?.data || "Transfer failed. Please check the details and try again.");
    }
  };

  return (
    <div className="container py-5 mt-5">
      <h2 className="text-success text-center mb-4">Transfer Money</h2>

      {/* Transfer Section */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Recipient Username"
          value={toUser}
          onChange={(e) => setToUser(e.target.value)}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="btn btn-success w-100" onClick={handleTransfer}>
          Transfer
        </button>
      </div>

      {/* Transactions List */}
      <h3 className="text-success text-center mb-3">Transactions</h3>
      <ul className="list-group">
        {transactions.length > 0 ? (
          transactions.map((t) => (
            <li key={t.id} className="list-group-item">
              {t.description} | Amount: {t.amount}
            </li>
          ))
        ) : (
          <li className="list-group-item text-muted text-center">
            No transactions yet.
          </li>
        )}
      </ul>
    </div>
  );
};

export default Transactions;
