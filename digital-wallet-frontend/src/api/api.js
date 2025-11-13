import axios from "axios";
import { getToken } from "../utils/auth";

const API_BASE_URL = "http://localhost:8080/api";

const authHeader = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

// Auth
export const loginUser = (data) => axios.post(`${API_BASE_URL}/authentication/login`, data);
export const registerUser = (data) => axios.post(`${API_BASE_URL}/authentication/register`, data);

// Wallet
export const getWalletBalance = (username) =>
  axios.get(`${API_BASE_URL}/wallet/balance/${username}`, authHeader());

export const depositMoney = (username, amount) =>
  axios.post(`${API_BASE_URL}/wallet/deposit/${username}`, null, { params: { amount: parseFloat(amount) }, ...authHeader() });

export const withdrawMoney = (username, amount) =>
  axios.post(`${API_BASE_URL}/wallet/withdraw/${username}`, null, { params: { amount: parseFloat(amount) }, ...authHeader() });

// Transactions
export const transferMoney = (fromUser, toUser, amount) =>
  axios.post(`${API_BASE_URL}/transactions/transfer`, null, { params: { fromUser, toUser, amount: parseFloat(amount) }, ...authHeader() });

export const getTransactions = (username) =>
  axios.get(`${API_BASE_URL}/transactions/getTransactions/${username}`, authHeader());

// Beneficiaries
export const getBeneficiaries = (username) =>
  axios.get(`${API_BASE_URL}/beneficiaries/${username}`, authHeader());

export const addBeneficiary = (username, beneficiary) =>
  axios.post(`${API_BASE_URL}/beneficiaries/${username}/add`, beneficiary, authHeader());

// Admin
export const getAllUsers = () => axios.get(`${API_BASE_URL}/admin/users`, authHeader());
export const deleteUser = (id) => axios.delete(`${API_BASE_URL}/admin/users/${id}`, authHeader());
export const getAllTransactions = () => axios.get(`${API_BASE_URL}/admin/transactions`, authHeader());
export const getAllWallets = () => axios.get(`${API_BASE_URL}/admin/wallets`, authHeader());
