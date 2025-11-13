import React from "react";
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Fixed Header */}
      <AppBar position="fixed" sx={{ backgroundColor: "#2e7d32", boxShadow: 3 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Admin Dashboard
          </Typography>
          <Button color="inherit" onClick={() => alert("Logout functionality here")}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container
        sx={{
          mt: 12, // offset for fixed AppBar
          mb: 6,
          maxWidth: "lg",
          overflowX: "hidden",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold", mb: 6 }}
        >
          Welcome, Admin
        </Typography>

        <Grid container spacing={4}>
          {/* Users Card */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                backgroundColor: "#a5d6a7",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                  All Users
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View and manage all registered users.
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ mt: 3 }}
                  onClick={() => navigate("/admin/users")}
                >
                  View Users
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Wallets Card */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                backgroundColor: "#81c784",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                  Wallets
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage wallet balances and account statuses.
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ mt: 3 }}
                  onClick={() => navigate("/admin/wallets")}
                >
                  View Wallets
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Transactions Card */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                backgroundColor: "#66bb6a",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                  Transactions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View all transactions performed by users.
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ mt: 3 }}
                  onClick={() => navigate("/admin/transactions")}
                >
                  View Transactions
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Optional Logout Button */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Button
            variant="contained"
            color="success"
            sx={{ px: 5 }}
            onClick={() => alert("Logout functionality here")}
          >
            Logout
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default AdminDashboard;
