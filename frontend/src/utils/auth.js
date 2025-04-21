// utils/auth.js
import api from "../services/api";

//   Get token from localStorage
export const getToken = () => {
  try {
    const tokenObj = JSON.parse(localStorage.getItem("token"));
    return tokenObj?.token || null;
  } catch {
    return null;
  }
};

//   Get username from localStorage
export const getUsername = () => {
  return localStorage.getItem("username");
};

//   Save token to localStorage
export const setToken = (token) => {
  localStorage.setItem("token", JSON.stringify({ token }));
};

//   Save username to localStorage
export const setUsername = (username) => {
  localStorage.setItem("username", username);
};

//   Remove user data on logout
export const clearAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
};

//   Login API call
export const loginUser = async (formData) => {
  const res = await api.post("/auth/login", formData);
  return res.data;
};
