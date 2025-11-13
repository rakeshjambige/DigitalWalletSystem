import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, clearAuth, getUsername, isAdmin } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    clearAuth(); // clear token, username, role
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#2e7d32", // nice green
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        zIndex: 1300,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: "bold",
            letterSpacing: 1,
            "&:hover": { color: "#a5d6a7" },
          }}
        >
          Digital Wallet
        </Typography>

        {isLoggedIn() ? (
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {!isAdmin() && (
              <>
                <Button
                  component={Link}
                  to="/wallet"
                  sx={{ color: "#fff", "&:hover": { backgroundColor: "#1b5e20" } }}
                >
                  Wallet
                </Button>
                <Button
                  component={Link}
                  to="/beneficiaries"
                  sx={{ color: "#fff", "&:hover": { backgroundColor: "#1b5e20" } }}
                >
                  Beneficiaries
                </Button>
                <Button
                  component={Link}
                  to="/transactions"
                  sx={{ color: "#fff", "&:hover": { backgroundColor: "#1b5e20" } }}
                >
                  Transactions
                </Button>
              </>
            )}
            {isAdmin() && (
              <>
                <Button
                  component={Link}
                  to="/admin/users"
                  sx={{ color: "#fff", "&:hover": { backgroundColor: "#1b5e20" } }}
                >
                  Users
                </Button>
                <Button
                  component={Link}
                  to="/admin/wallets"
                  sx={{ color: "#fff", "&:hover": { backgroundColor: "#1b5e20" } }}
                >
                  Wallets
                </Button>
                <Button
                  component={Link}
                  to="/admin/transactions"
                  sx={{ color: "#fff", "&:hover": { backgroundColor: "#1b5e20" } }}
                >
                  Transactions
                </Button>
              </>
            )}

            <Typography
              variant="body2"
              sx={{
                mx: 2,
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              {getUsername()}
            </Typography>
            <Button
              onClick={logout}
              sx={{
                color: "#fff",
                border: "1px solid #fff",
                "&:hover": { backgroundColor: "#1b5e20", borderColor: "#a5d6a7" },
              }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              component={Link}
              to="/login"
              sx={{ color: "#fff", "&:hover": { backgroundColor: "#1b5e20" } }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              sx={{ color: "#fff", "&:hover": { backgroundColor: "#1b5e20" } }}
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
