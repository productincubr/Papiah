import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const secretKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_KEY;
const publishableKey =
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !secretKey) {
  console.error("CRITICAL CONFIG ERROR: Supabase URL or secret key is missing from environment variables.");
}

// Privileged, module-level singleton reused across every request. Session
// persistence is disabled on purpose: if any code path ever called an auth
// method that establishes a session (signInWithPassword, setSession, ...)
// on this instance, that user's session would silently replace the secret
// key on every later .from() query server-wide, downgrading every request
// (from every user, until the process restarts) from admin/RLS-bypass
// access to that one user's own restricted access. Use admin.* methods
// here for privileged auth operations; never call session-establishing
// auth methods on this client.
export const supabase = createClient(supabaseUrl, secretKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Creates a throwaway client for auth flows that must establish a brand
// new user session (login, post-signup auto-login, logout, password
// reset). Each call gets its own instance so the resulting session can
// never leak into the shared admin client above.
export const createUserClient = () =>
  createClient(supabaseUrl, publishableKey || secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
