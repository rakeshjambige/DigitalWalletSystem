import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Box,
  Paper,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { getToken } from "../utils/auth";
import axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [amounts, setAmounts] = useState({});

  const BASE_URL = "http://localhost:8080/api/admin";

  const authHeaders = {
    headers: { Authorization: `Bearer ${getToken()}` },
  };

  const loadUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users`, authHeaders);
      setUsers(res.data);
    } catch (err) {
      console.error("Error loading users:", err);
      alert("Error loading users. Check console for details.");
    }
  };

  const loadTransactions = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/transactions`, authHeaders);
      setTransactions(res.data);
    } catch (err) {
      console.error("Error loading transactions:", err);
      alert("Error loading transactions. Check console for details.");
    }
  };

  useEffect(() => {
    loadUsers();
    loadTransactions();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure to delete this user?")) return;
    try {
      await axios.delete(`${BASE_URL}/users/${id}`, authHeaders);
      alert("User deleted successfully");
      loadUsers();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed. Check console for details.");
    }
  };

  const updateBalance = async (id) => {
    const amount = amounts[id];
    if (!amount) return alert("Enter amount to update");
    try {
      await axios.put(
        `${BASE_URL}/users/${id}/balance`,
        null,
        { params: { amount }, ...authHeaders }
      );
      alert("Balance updated successfully");
      setAmounts({ ...amounts, [id]: "" });
      loadUsers();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed. Check console for details.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Admin Dashboard
      </Typography>

      {/* Users Section */}
      <Card sx={{ mb: 6 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
          <Paper sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Balance</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.balance}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </Button>
                        <TextField
                          label="Amount"
                          size="small"
                          value={amounts[user.id] || ""}
                          onChange={(e) =>
                            setAmounts({ ...amounts, [user.id]: e.target.value })
                          }
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => updateBalance(user.id)}
                        >
                          Update Balance
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </CardContent>
      </Card>

      {/* Transactions Section */}
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Transactions
          </Typography>
          <Paper sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{t.id}</TableCell>
                    <TableCell>{t.fromUser?.username}</TableCell>
                    <TableCell>{t.toUser?.username}</TableCell>
                    <TableCell>{t.amount}</TableCell>
                    <TableCell>{t.transactiontype}</TableCell>
                    <TableCell>
                      {new Date(t.timestamp).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Admin;
