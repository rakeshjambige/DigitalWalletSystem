import React, { useEffect, useState } from "react";
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Paper, TableContainer } from "@mui/material";
import { getAllWallets } from "../api/api";

const AdminWallets = () => {
  const [wallets, setWallets] = useState([]);

  const loadWallets = async () => {
    try {
      const res = await getAllWallets();
      setWallets(res.data);
      console.log("Wallets loaded:", res.data);
    } catch (err) {
      console.error("Error loading wallets:", err);
      alert("Error loading wallets. Check console for details.");
    }
  };

  useEffect(() => {
    loadWallets();
  }, []);

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: "bold", color: "#2e7d32" }}>
        All Wallets
      </Typography>
      <Button variant="contained" sx={{ mb: 3 }} onClick={loadWallets}>Reload</Button>
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, overflow: "hidden" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#e8f5e9" }}>
            <TableRow>
              {["ID", "Account Number", "User", "Balance", "Status"].map((header) => (
                <TableCell key={header} sx={{ fontWeight: "bold", color: "#33691e" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {wallets.length > 0 ? (
              wallets.map((wallet, index) => (
                <TableRow
                  key={wallet.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f1f8e9" : "white",
                    "&:hover": { backgroundColor: "#c8e6c9" },
                  }}
                >
                  <TableCell>{wallet.id}</TableCell>
                  <TableCell>{wallet.accountNumber}</TableCell>
                  <TableCell>{wallet.user?.username}</TableCell>
                  <TableCell>{wallet.balance}</TableCell>
                  <TableCell>{wallet.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3, color: "gray" }}>
                  No wallets found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminWallets;
