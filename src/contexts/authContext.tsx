"use client";

import { loginUser, registerUser } from "@/services/authService";
import {
  createContext,
  useEffect,
  useContext,
  useState,
  ReactNode,
} from "react";

interface User {
  studentId: string;
  name: string;
  emailId: string;
  mobileNumber: string;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: object) => Promise<void>;
  logout: () => void;
  register: (userData: object) => Promise<any>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("token");
      const storeUser = localStorage.getItem("user");

      if (token && storeUser) {
        setUser(JSON.parse(storeUser));
      }

      // profile logic will be added later

      setLoading(false);
    };
    checkSession();
  }, []);

  const login = async (credentials: object) => {
    const { user, token } = await loginUser(credentials);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const register = async (userData: object) => {
    return registerUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated, loading, login, logout, register }}
    >
      {!loading && children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
