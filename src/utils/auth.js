// src/utils/auth.js

// Save the token to localStorage
export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};

// Get the token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem("token") || null;
};

// Remove the token from localStorage (logout)
export const removeAuthToken = () => {
  localStorage.removeItem("token");
};

// Check if the user is authenticated
export const isAuthenticated = () => {
  return !!getAuthToken();
};
