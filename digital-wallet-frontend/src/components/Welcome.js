import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "linear-gradient(135deg, #a8e6cf, #dcedc1, #b9fbc0)",
        padding: 4,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          color: "#1b5e20",
          mb: 2,
          letterSpacing: 1,
          textShadow: "2px 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        🌿 Welcome to Digital Wallet
      </Typography>

      <Typography
        variant="h6"
        sx={{
          color: "#2e7d32",
          mb: 4,
          maxWidth: "700px",
          fontStyle: "italic",
          lineHeight: 1.6,
        }}
      >
        Manage your finances smartly — deposit, withdraw, and track transactions
        with ease. Your money, your control — secure and seamless.
      </Typography>

      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#43a047",
            "&:hover": { backgroundColor: "#2e7d32" },
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
            borderRadius: 3,
            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
          }}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>

        <Button
          variant="outlined"
          sx={{
            color: "#2e7d32",
            borderColor: "#2e7d32",
            "&:hover": {
              borderColor: "#1b5e20",
              color: "#1b5e20",
              backgroundColor: "rgba(46,125,50,0.1)",
            },
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
            borderRadius: 3,
            boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          }}
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Welcome;
