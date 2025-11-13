const AUTH_KEY = "digital_wallet_auth";

export const storeAuth = (token, username, role) => {
  const data = { token, username, role };
  localStorage.setItem(AUTH_KEY, JSON.stringify(data));
};

export const getAuth = () => {
  const data = localStorage.getItem(AUTH_KEY);
  return data ? JSON.parse(data) : {};
};

export const getToken = () => getAuth().token;
export const getUsername = () => getAuth().username;
export const getRole = () => getAuth().role;
export const isLoggedIn = () => !!getToken();
export const isAdmin = () => getRole() === "ADMIN";
export const clearAuth = () => localStorage.removeItem(AUTH_KEY);
