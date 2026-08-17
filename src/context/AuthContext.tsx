import React, { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "../config/api";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: { firstName?: string; lastName?: string; phone?: string; avatar?: string }) => Promise<{ success: boolean; error?: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("papiah_token");
    const storedUser = localStorage.getItem("papiah_user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      // Check if there are query parameters (redirected back from social login)
      const params = new URLSearchParams(window.location.search);
      const queryToken = params.get("token");
      const queryUserStr = params.get("user");
      
      if (queryToken && queryUserStr) {
        try {
          const queryUser = JSON.parse(decodeURIComponent(queryUserStr));
          localStorage.setItem("papiah_token", queryToken);
          localStorage.setItem("papiah_user", JSON.stringify(queryUser));
          setToken(queryToken);
          setUser(queryUser);
          
          // Clear query parameters from URL for a clean browser history
          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
        } catch (e) {
          console.error("Error parsing user query param:", e);
        }
      }
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        return { success: false, error: data.error || "Login failed" };
      }

      const userSession = data.session;
      const userData: User = {
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.first_name || data.user.firstName || "",
        lastName: data.user.last_name || data.user.lastName || "",
        phone: data.user.phone || "",
        avatar: data.user.avatar || "",
        role: data.user.role || "customer",
      };

      localStorage.setItem("papiah_token", userSession.access_token);
      localStorage.setItem("papiah_user", JSON.stringify(userData));
      setToken(userSession.access_token);
      setUser(userData);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error" };
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });
      const data = await response.json();
      if (!response.ok) {
        return { success: false, error: data.error || "Registration failed" };
      }

      if (data.session) {
        const userSession = data.session;
        const userData: User = {
          id: data.user.id,
          email: data.user.email,
          firstName: data.user.first_name || data.user.firstName || "",
          lastName: data.user.last_name || data.user.lastName || "",
          phone: data.user.phone || "",
          avatar: data.user.avatar || "",
          role: data.user.role || "customer",
        };
        localStorage.setItem("papiah_token", userSession.access_token);
        localStorage.setItem("papiah_user", JSON.stringify(userData));
        setToken(userSession.access_token);
        setUser(userData);
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error" };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await fetch(`${API_URL}/users/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (err) {
      console.error("Logout error on server:", err);
    } finally {
      localStorage.removeItem("papiah_token");
      localStorage.removeItem("papiah_user");
      setToken(null);
      setUser(null);
      window.history.pushState(null, "", "/login");
    }
  };

  const updateProfile = async (profileData: { firstName?: string; lastName?: string; phone?: string; avatar?: string }) => {
    try {
      if (!token) return { success: false, error: "Not authenticated" };

      const response = await fetch(`${API_URL}/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });
      const data = await response.json();
      if (!response.ok) {
        return { success: false, error: data.error || "Profile update failed" };
      }

      const updatedUser = {
        ...user!,
        firstName: data.user.first_name || data.user.firstName || profileData.firstName || user?.firstName || "",
        lastName: data.user.last_name || data.user.lastName || profileData.lastName || user?.lastName || "",
        phone: data.user.phone || profileData.phone || user?.phone || "",
        avatar: data.user.avatar || profileData.avatar || user?.avatar || "",
      };

      localStorage.setItem("papiah_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error" };
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const response = await fetch(`${API_URL}/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        return { success: false, error: data.error || "Reset request failed" };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error" };
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateProfile, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
