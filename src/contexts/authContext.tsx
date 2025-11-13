"use client";

import { loginUser, registerUser } from "../services/authService";
import {
  createContext,
  useEffect,
  useContext,
  useState,
  ReactNode,
} from "react";
// 1. Import jwt-decode
import { jwtDecode } from "jwt-decode";

// This interface is good. It matches your user data.
interface User {
  studentId: string;
  role: "USER" | "ADMIN";
}

// NEW: Define the shape of the token's payload (we only need 'exp')
interface DecodedToken {
  exp: number; // 'expires at' timestamp
  // ...it probably has other fields like 'sub' and 'role', but we only need 'exp'
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

  // 2. UPDATED useEffect to check token expiration
  useEffect(() => {
    const checkSession = () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser && storedUser !== "undefined") {
        try {
          // Decode the token to check its expiration
          const decoded = jwtDecode<DecodedToken>(token);

          // Check if token is expired (exp is in seconds, Date.now() is in ms)
          if (decoded.exp * 1000 > Date.now()) {
            // Token is valid, set the user
            setUser(JSON.parse(storedUser));
          } else {
            // Token is expired, log the user out
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        } catch (error) {
          console.error("Failed to parse token or user", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    };
    checkSession();
  }, []);

  // Your login function is good
  const login = async (credentials: object) => {
    const { token, studentId, role } = await loginUser(credentials);
    const user: User = { studentId, role };

    if (user && token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } else {
      throw new Error("Login successful but no user data received.");
    }
  };

  // Your register function is good
  const register = async (userData: object) => {
    return registerUser(userData);
  };

  // Your logout function is good
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

// Your useUser hook is good
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
