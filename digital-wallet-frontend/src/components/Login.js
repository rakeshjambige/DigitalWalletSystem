import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";  // ✅ Added Link
import { loginUser } from "../api/api";
import { storeAuth } from "../utils/auth";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginUser({ username, password });
      const token = res.data;

      // Decode JWT to get role
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const role = decoded.role;

      storeAuth(token, username, role);

      if (role === "ADMIN") {
        navigate("/admin/users");
      } else {
        navigate("/wallet");
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Please check your username and password.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      className="mt-5 d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Card
        sx={{
          width: "100%",
          bgcolor: "#a5d6a7", // light green background
          boxShadow: 6,
          borderRadius: 3,
        }}
        className="p-4"
      >
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 4, fontWeight: "bold", color: "#1b5e20" }}
          >
            Login
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ bgcolor: "white", borderRadius: 1 }}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ bgcolor: "white", borderRadius: 1 }}
            />

            <Button
              variant="contained"
              color="success"
              fullWidth
              size="large"
              onClick={handleLogin}
              sx={{
                mt: 2,
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#2e7d32" },
              }}
            >
              Login
            </Button>

            {/* ✅ Register link */}
            <Typography
              align="center"
              sx={{ mt: 2, color: "#1b5e20", fontSize: "1rem" }}
            >
              Not registered?{" "}
              <Link
                to="/register"
                style={{
                  color: "#2e7d32",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Register here
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
