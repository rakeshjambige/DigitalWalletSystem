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
import { getAllUsers, deleteUser } from "../api/api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
      console.log("Users loaded:", res.data);
    } catch (err) {
      console.error("Error loading users:", err);
      alert("Error loading users. Check console for details.");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this user?")) return;
    try {
      await deleteUser(id);
      alert("User deleted successfully");
      loadUsers();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed. Check console for details.");
    }
  };

  return (
    <Container sx={{ mt: 10 /* Adds ~80px gap below navbar for spacing */ }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 2, fontWeight: "bold" }}>
        All Users
      </Typography>
      <Button variant="contained" sx={{ mb: 2 }} onClick={loadUsers}>
        Reload Users
      </Button>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3, borderRadius: 2, overflow: "hidden" }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#e8f5e9" }}>
            <TableRow>
              {["ID", "Username", "Email", "Role", "Actions"].map((header) => (
                <TableCell
                  key={header}
                  sx={{ fontWeight: "bold", color: "#2e7d32" }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((u, idx) => (
                <TableRow
                  key={u.id}
                  sx={{
                    backgroundColor: idx % 2 === 0 ? "#f9fbe7" : "white",
                    "&:hover": { backgroundColor: "#dcedc8" },
                  }}
                >
                  <TableCell>{u.id}</TableCell>
                  <TableCell>{u.username}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>{u.role}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(u.id)}
                      size="small"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ color: "gray" }}>
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminUsers;
