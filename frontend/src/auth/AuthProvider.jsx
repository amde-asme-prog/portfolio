import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/baseAPI";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const response = await axiosInstance.post("/login", { email, password });
    localStorage.setItem("authToken", response.data.access_token);
    setUser({ email });
  };

  const register = async (name, email, password, password_confirmation) => {
    await axiosInstance.post("/register", {
      name,
      email,
      password,
      password_confirmation,
    });
  };

  const logout = async () => {
    await axiosInstance.post("/logout", null, {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    });
    localStorage.removeItem("authToken");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) setUser({ email: "placeholder@example.com" }); // Fetch user info here if needed
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
