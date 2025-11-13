import React, { useState, useEffect } from "react";
import { getUsername } from "../utils/auth";
import { getBeneficiaries, addBeneficiary } from "../api/api";
import "bootstrap/dist/css/bootstrap.min.css";

const Beneficiaries = () => {
  const username = getUsername();
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [nickname, setNickname] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [errors, setErrors] = useState({}); // for validation messages

  const fetchBeneficiaries = async () => {
    try {
      const res = await getBeneficiaries(username);
      setBeneficiaries(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch beneficiaries.");
    }
  };

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!nickname.trim() || nickname.length < 3) {
      newErrors.nickname = "Nickname must be at least 3 characters.";
    }

    if (!accountNumber.trim()) {
      newErrors.accountNumber = "Account number is required.";
    } else if (!/^\d{12}$/.test(accountNumber)) {
      newErrors.accountNumber = "Account number must be exactly 12 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = async () => {
    if (!validate()) return;

    try {
      await addBeneficiary(username, {
        nickname,
        beneficiaryAccountNumber: accountNumber,
      });
      alert(`Beneficiary "${nickname}" added successfully!`);
      setNickname("");
      setAccountNumber("");
      setErrors({});
      fetchBeneficiaries();
    } catch (err) {
      console.error(err);
      alert("Failed to add beneficiary. Please try again.");
    }
  };

  return (
    <div className="container py-5 mt-5">
      <h2 className="text-center text-success mb-4">Beneficiaries</h2>

      {/* Input Section */}
      <div className="mb-4">
        <input
          type="text"
          className={`form-control mb-1 ${errors.nickname ? "is-invalid" : ""}`}
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        {errors.nickname && (
          <div className="text-danger mb-2">{errors.nickname}</div>
        )}

        <input
          type="text"
          className={`form-control mb-1 ${errors.accountNumber ? "is-invalid" : ""}`}
          placeholder="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
        {errors.accountNumber && (
          <div className="text-danger mb-2">{errors.accountNumber}</div>
        )}

        <button className="btn btn-success w-100" onClick={handleAdd}>
          Add Beneficiary
        </button>
      </div>

      {/* Beneficiaries List */}
      <ul className="list-group">
        {beneficiaries.length > 0 ? (
          beneficiaries.map((b) => (
            <li key={b.id} className="list-group-item">
              {b.nickname} — {b.beneficiaryAccountNumber}
            </li>
          ))
        ) : (
          <li className="list-group-item text-muted text-center">
            No beneficiaries yet.
          </li>
        )}
      </ul>
    </div>
  );
};

export default Beneficiaries;
