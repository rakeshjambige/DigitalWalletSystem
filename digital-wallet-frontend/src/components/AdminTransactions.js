import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  TableContainer,
} from "@mui/material";
import { getAllTransactions } from "../api/api";

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  const loadTransactions = async () => {
    try {
      const res = await getAllTransactions();
      setTransactions(res.data);
      console.log("Transactions loaded:", res.data);
    } catch (err) {
      console.error("Error loading transactions:", err);
      alert("Error loading transactions. Check console for details.");
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <Container sx={{ mt: 10 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ mb: 3, fontWeight: "bold", color: "#2e7d32" }}
      >
        All Transactions
      </Typography>
      <Button variant="contained" sx={{ mb: 3 }} onClick={loadTransactions}>
        Reload Transactions
      </Button>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3, borderRadius: 2, overflow: "hidden" }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#e8f5e9" }}>
            <TableRow>
              {[
                "ID",
                "From",
                "To",
                "Amount",
                "Type",
                "Date",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{ fontWeight: "bold", color: "#33691e" }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((t, index) => (
                <TableRow
                  key={t.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f1f8e9" : "white",
                    "&:hover": { backgroundColor: "#c8e6c9" },
                  }}
                >
                  <TableCell>{t.id}</TableCell>
                  <TableCell>{t.fromUser?.username}</TableCell>
                  <TableCell>{t.toUser?.username}</TableCell>
                  <TableCell>{t.amount}</TableCell>
                  <TableCell>{t.transactiontype}</TableCell>
                  <TableCell>
                    {new Date(t.timestamp).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3, color: "gray" }}>
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminTransactions;
