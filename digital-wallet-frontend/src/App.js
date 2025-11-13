import { Routes, Route, Navigate } from "react-router-dom";
import { isLoggedIn, isAdmin } from "./utils/auth";

// Components
import Welcome from "./components/Welcome"; // 👈 New Welcome Page

import Navbar from "./components/navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Wallet from "./components/wallet";
import Beneficiaries from "./components/Beneficiaries";
import Transactions from "./components/Transactions";
import AdminUsers from "./components/AdminUsers";
import AdminWallets from "./components/AdminWallets";
import AdminTransactions from "./components/AdminTransactions";

// Protected route for logged-in users
const ProtectedRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
};

// Admin-only route
const AdminRoute = ({ children }) => {
  if (!isLoggedIn()) return <Navigate to="/login" replace />;
  if (!isAdmin()) return <Navigate to="/wallet" replace />;
  return children;
};

function App() {
  return (
    <>
      {/* Show navbar only when logged in */}
      {isLoggedIn() && <Navbar />}

      <Routes>
        {/* Default route */}
        <Route
          path="/"
          element={
            isLoggedIn() ? (
              isAdmin() ? (
                <Navigate to="/admin/users" replace />
              ) : (
                <Navigate to="/wallet" replace />
              )
            ) : (
              <Welcome />
            )
          }
        />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User routes */}
        <Route
          path="/wallet"
          element={
            <ProtectedRoute>
              <Wallet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/beneficiaries"
          element={
            <ProtectedRoute>
              <Beneficiaries />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/wallets"
          element={
            <AdminRoute>
              <AdminWallets />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/transactions"
          element={
            <AdminRoute>
              <AdminTransactions />
            </AdminRoute>
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
