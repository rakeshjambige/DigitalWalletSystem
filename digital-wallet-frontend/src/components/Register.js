import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!fullname.trim() || fullname.length < 3) {
      newErrors.fullname = "Full Name must be at least 3 characters";
    }

    if (!username.trim() || username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email address";
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phonenumber)) {
      newErrors.phonenumber = "Phone number must be 10 digits";
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      await axios.post("http://localhost:8080/api/authentication/register", {
        username,
        fullname,
        email,
        phonenumber,
        password,
      });
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="register-container py-5 md-4">
      <h1 className="register-heading py-5 md-4">Create Account</h1>
      <p className="register-subtitle">Join our Digital Wallet community</p>

      <form className="register-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder=" "
          />
          <label>Full Name</label>
          {errors.fullname && <span className="error">{errors.fullname}</span>}
        </div>

        <div className="form-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder=" "
          />
          <label>Username</label>
          {errors.username && <span className="error">{errors.username}</span>}
        </div>

        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
          />
          <label>Email</label>
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <input
            type="text"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            placeholder=" "
          />
          <label>Phone Number</label>
          {errors.phonenumber && (
            <span className="error">{errors.phonenumber}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
          />
          <label>Password</label>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder=" "
          />
          <label>Confirm Password</label>
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>

        <button className="register-button" onClick={handleRegister}>
          Sign Up
        </button>
      </form>

      <p className="register-footer">
        Already have an account?{" "}
        <a href="/login" className="login-link">
          Login
        </a>
      </p>
    </div>
  );
}

export default Register;
