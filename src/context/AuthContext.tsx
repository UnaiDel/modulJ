// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { login as apiLogin, verifyToken, logout as apiLogout, register as apiRegister } from '../services/apiService';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) verifyUserToken();
  }, []);

  const verifyUserToken = async () => {
    try {
      await verifyToken();
      setIsAuthenticated(true);
    } catch {
      apiLogout();
      setIsAuthenticated(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await apiLogin(email, password);
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    apiLogout();
    setIsAuthenticated(false);
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await apiRegister(email, password);
      return data.success;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
