import { createContext, useContext, useState, useEffect } from "react";
import {
  getSession,
  login as authLogin,
  logout as authLogout,
  signup as authSignup,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getSession());
    setLoading(false);
  }, []);

  const login = (credentials) => {
    const session = authLogin(credentials);
    setUser(session);
    return session;
  };

  const signup = (data) => {
    const newUser = authSignup(data);
    return newUser;
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
