import { supabase } from "../config/supabase.js";

/**
 * Middleware to verify Supabase JWT token.
 * Extracts the token from cookies (via cookie-parser) or the Authorization header,
 * verifies it with Supabase, and attaches the user data to req.user.
 */
export const verifyToken = async (req, res, next) => {
  try {
    let token = null;

    // 1. Try to extract from cookies (using cookie-parser)
    if (req.cookies && req.cookies.access_token) {
      token = req.cookies.access_token;
    } 
    // 2. Fallback to Authorization header (Bearer <token>)
    else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ error: "Access token is missing. Access denied." });
    }

    // 3. Verify the token against Supabase Auth API
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Invalid or expired access token." });
    }

    // Fetch user profile from public.users table to get custom fields (like role)
    const { data: profile } = await supabase
      .from("users")
      .select("role, first_name, last_name, phone, avatar")
      .eq("id", user.id)
      .single();

    // 4. Attach user object (with DB fields merged) and token to the request
    req.user = {
      ...user,
      role: profile?.role || "customer",
      firstName: profile?.first_name || "",
      lastName: profile?.last_name || "",
      phone: profile?.phone || "",
      avatar: profile?.avatar || "",
    };
    req.token = token;

    next();
  } catch (err) {
    console.error("Authentication Middleware Error:", err);
    return res.status(500).json({ error: "Internal server authentication error" });
  }
};

/**
 * Middleware to restrict access to Admin-only routes.
 * Must be used after verifyToken middleware.
 */
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ error: "Access denied. Admin role required." });
  }
};

