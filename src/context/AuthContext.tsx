import React, { createContext, useContext, useState, useEffect, useRef } from "react";
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

const buildUserData = (rawUser: any): User => ({
  id: rawUser.id,
  email: rawUser.email,
  firstName: rawUser.first_name || rawUser.firstName || "",
  lastName: rawUser.last_name || rawUser.lastName || "",
  phone: rawUser.phone || "",
  avatar: rawUser.avatar || "",
  role: rawUser.role || "customer",
});

// Supabase access tokens expire after ~1hr. Without refreshing them, any
// session left open past that (an admin's dashboard tab, a shopper mid
// checkout) starts failing every API call with "Invalid or expired access
// token" until the user manually logs out and back in.
const persistSession = (userData: User, session: { access_token: string; refresh_token: string; expires_in: number }) => {
  const expiresAt = Date.now() + session.expires_in * 1000;
  localStorage.setItem("papiah_token", session.access_token);
  localStorage.setItem("papiah_user", JSON.stringify(userData));
  localStorage.setItem("papiah_refresh_token", session.refresh_token);
  localStorage.setItem("papiah_expires_at", String(expiresAt));
  return expiresAt;
};

const clearSession = () => {
  localStorage.removeItem("papiah_token");
  localStorage.removeItem("papiah_user");
  localStorage.removeItem("papiah_refresh_token");
  localStorage.removeItem("papiah_expires_at");
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const refreshTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleRefresh = (expiresAt: number) => {
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
    // Refresh a minute before expiry, but never less than 5s out.
    const delay = Math.max(expiresAt - Date.now() - 60_000, 5_000);
    refreshTimer.current = setTimeout(() => {
      refreshSession();
    }, delay);
  };

  const refreshSession = async (): Promise<boolean> => {
    const storedRefreshToken = localStorage.getItem("papiah_refresh_token");
    if (!storedRefreshToken) return false;

    try {
      const response = await fetch(`${API_URL}/users/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: storedRefreshToken }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Session refresh failed");

      const userData = buildUserData(data.user);
      const expiresAt = persistSession(userData, data.session);
      setToken(data.session.access_token);
      setUser(userData);
      scheduleRefresh(expiresAt);
      return true;
    } catch (err) {
      console.error("Session refresh failed, logging out:", err);
      clearSession();
      setToken(null);
      setUser(null);
      return false;
    }
  };

  useEffect(() => {
    const init = async () => {
      const storedToken = localStorage.getItem("papiah_token");
      const storedUser = localStorage.getItem("papiah_user");
      const storedExpiresAt = Number(localStorage.getItem("papiah_expires_at") || 0);

      if (storedToken && storedUser) {
        if (storedExpiresAt && storedExpiresAt - Date.now() < 60_000) {
          // Already expired (or about to) - refresh before trusting it.
          await refreshSession();
        } else {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          if (storedExpiresAt) scheduleRefresh(storedExpiresAt);
        }
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
    };

    init();

    return () => {
      if (refreshTimer.current) clearTimeout(refreshTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      const userData = buildUserData(data.user);
      const expiresAt = persistSession(userData, data.session);
      setToken(data.session.access_token);
      setUser(userData);
      scheduleRefresh(expiresAt);
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
        const userData = buildUserData(data.user);
        const expiresAt = persistSession(userData, data.session);
        setToken(data.session.access_token);
        setUser(userData);
        scheduleRefresh(expiresAt);
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
      if (refreshTimer.current) clearTimeout(refreshTimer.current);
      clearSession();
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
