import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthResponse, User } from "../types/auth.types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (data: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser]   = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Load from localStorage on app start
    const savedToken    = localStorage.getItem("token");
    const savedUser     = localStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (data: AuthResponse) => {
    setToken(data.token);
    const userObj: User = {
      userId:   data.userId,
      fullName: data.fullName,
      role:     data.role,
      email:    "",
    };
    setUser(userObj);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user",  JSON.stringify(userObj));
    localStorage.setItem("role",  data.role);
  };

 const logout = () => {
  setToken(null);
  setUser(null);
  localStorage.clear();
  window.location.href = "/login";
};
  return (
    <AuthContext.Provider value={{
      user, token,
      isLoggedIn: !!token,
      login, logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);