"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "ADMIN" | "INSTRUCTOR" | "STUDENT" | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for different roles
const mockUsers: Record<string, User> = {
  admin: {
    id: "1",
    name: "Admin User",
    email: "admin@skool.com",
    role: "ADMIN",
    avatar: "A",
  },
  instructor: {
    id: "2",
    name: "Sarah Lin",
    email: "instructor@skool.com",
    role: "INSTRUCTOR",
    avatar: "SL",
  },
  student: {
    id: "3",
    name: "John Doe",
    email: "student@skool.com",
    role: "STUDENT",
    avatar: "JD",
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("skool_user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse stored user", e);
          localStorage.removeItem("skool_user");
        }
      }
    }
  }, []);

  const login = (email: string, password: string, role: UserRole) => {
    // Mock authentication - in real app, this would be an API call
    const roleKey = role?.toLowerCase() as keyof typeof mockUsers;
    if (roleKey && mockUsers[roleKey]) {
      const loggedInUser = { ...mockUsers[roleKey] };
      setUser(loggedInUser);
      if (typeof window !== "undefined") {
        localStorage.setItem("skool_user", JSON.stringify(loggedInUser));
      }
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("skool_user");
    }
  };

  const switchRole = (role: UserRole) => {
    if (!role) {
      logout();
      return;
    }
    const roleKey = role.toLowerCase() as keyof typeof mockUsers;
    if (roleKey && mockUsers[roleKey]) {
      const switchedUser = { ...mockUsers[roleKey] };
      setUser(switchedUser);
      if (typeof window !== "undefined") {
        localStorage.setItem("skool_user", JSON.stringify(switchedUser));
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        switchRole,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

