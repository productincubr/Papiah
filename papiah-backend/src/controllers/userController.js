import * as userService from "../services/userService.js";
import { supabase } from "../config/supabase.js";

/**
 * Handles user registration
 */
export const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone, avatar } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const data = await userService.registerUser({
      email,
      password,
      firstName,
      lastName,
      phone,
      avatar,
    });

    return res.status(201).json({
      message: "User registered successfully. Please verify your email if required.",
      user: data.user,
      session: data.session,
    });
  } catch (error) {
    console.error("Registration Controller Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

/**
 * Handles user login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const data = await userService.loginUser({ email, password });

    return res.status(200).json({
      message: "Login successful",
      user: data.user,
      session: data.session,
    });
  } catch (error) {
    console.error("Login Controller Error:", error);
    return res.status(error.status || 401).json({ error: error.message || "Invalid credentials" });
  }
};

/**
 * Exchanges a refresh token for a fresh access token + session
 */
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: "refreshToken is required" });
    }

    const data = await userService.refreshSession(refreshToken);

    return res.status(200).json({
      message: "Session refreshed",
      user: data.user,
      session: data.session,
    });
  } catch (error) {
    console.error("Refresh Token Controller Error:", error);
    return res.status(401).json({ error: error.message || "Failed to refresh session" });
  }
};

/**
 * Handles user logout
 */
export const logout = async (req, res) => {
  try {
    // Extract access token from Authorization header (Bearer <token>)
    const authHeader = req.headers.authorization;
    let token = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    const result = await userService.logoutUser(token);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Logout Controller Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

/**
 * Handles password reset requests
 */
export const requestPasswordReset = async (req, res) => {
  try {
    const { email, redirectTo } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    await userService.forgotPassword(email, redirectTo);

    return res.status(200).json({
      message: "Password reset instructions sent to email.",
    });
  } catch (error) {
    console.error("Forgot Password Controller Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

/**
 * Handles user profile updates
 */
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized. User ID not found." });
    }

    const { firstName, lastName, phone, avatar } = req.body;

    const updatedUser = await userService.updateProfile(userId, {
      firstName,
      lastName,
      phone,
      avatar,
    });

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Profile Controller Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

/**
 * Initiates Supabase OAuth authentication and redirects the client
 */
export const socialLogin = async (req, res) => {
  try {
    const { provider } = req.params;
    if (provider !== "google" && provider !== "apple") {
      return res.status(400).json({ error: "Invalid OAuth provider" });
    }

    // Dynamic backend callback URL
    const redirectUrl = `${req.protocol}://${req.get("host")}/api/users/auth/callback`;

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUrl,
      },
    });

    if (error) throw error;
    if (data.url) {
      return res.redirect(data.url);
    } else {
      return res.status(500).json({ error: "Could not generate authorization URL" });
    }
  } catch (error) {
    console.error("Social Login Error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

/**
 * Receives the authorization code from Supabase OAuth, exchanges it for a session, and redirects to frontend
 */
export const authCallback = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ error: "Authorization code is missing" });
    }

    // Exchange the code for a Supabase session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) throw error;

    const { session, user } = data;
    
    // Fetch user profile from public.users table to get custom fields
    const { data: profile } = await supabase
      .from("users")
      .select("role, first_name, last_name, phone, avatar")
      .eq("id", user.id)
      .single();

    const userData = {
      id: user.id,
      email: user.email,
      firstName: profile?.first_name || user.user_metadata?.first_name || "",
      lastName: profile?.last_name || user.user_metadata?.last_name || "",
      phone: profile?.phone || "",
      avatar: profile?.avatar || "",
      role: profile?.role || "customer",
    };

    // Redirect back to the frontend with token and user parameters in query string
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const redirectUrl = `${frontendUrl}/profile?token=${session.access_token}&user=${encodeURIComponent(JSON.stringify(userData))}`;
    
    return res.redirect(redirectUrl);
  } catch (error) {
    console.error("Auth Callback Error:", error);
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    return res.redirect(`${frontendUrl}/login?error=${encodeURIComponent(error.message || "OAuth login failed")}`);
  }
};

