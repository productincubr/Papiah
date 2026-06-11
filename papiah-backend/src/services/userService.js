import { supabase } from "../config/supabase.js";

/**
 * Register a new user with email, password, and profile metadata.
 * The on_auth_user_created trigger automatically inserts the record into public.users.
 */
export const registerUser = async ({ email, password, firstName, lastName, phone, avatar }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        avatar_url: avatar,
      },
    },
  });

  if (error) throw error;
  return data;
};

/**
 * Log in an existing user with email and password.
 * Returns the session containing access token, refresh token, and user details.
 */
export const loginUser = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

/**
 * Log out the currently authenticated user session.
 * In a backend environment, the client session is cleared.
 */
export const logoutUser = async (accessToken) => {
  // If an access token is provided, we can sign out by setting the session first
  if (accessToken) {
    const { error: setSessionError } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: "", // not strictly needed for signout
    });
    if (setSessionError) throw setSessionError;
  }

  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return { message: "Successfully logged out" };
};

/**
 * Trigger a password reset email for the specified email address.
 */
export const forgotPassword = async (email, redirectTo) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectTo || undefined,
  });

  if (error) throw error;
  return data;
};

/**
 * Update user profile details in public.users table and auth.users metadata.
 */
export const updateProfile = async (userId, { firstName, lastName, phone, avatar }) => {
  const updateData = {};
  if (firstName !== undefined) updateData.first_name = firstName;
  if (lastName !== undefined) updateData.last_name = lastName;
  if (phone !== undefined) updateData.phone = phone;
  if (avatar !== undefined) updateData.avatar = avatar;

  // 1. Update details in the public.users profile table
  const { data, error } = await supabase
    .from("users")
    .update(updateData)
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;

  // 2. Sync changes back to Supabase Auth metadata
  const authUpdate = {};
  if (firstName !== undefined || lastName !== undefined || avatar !== undefined) {
    authUpdate.data = {};
    if (firstName !== undefined) authUpdate.data.first_name = firstName;
    if (lastName !== undefined) authUpdate.data.last_name = lastName;
    if (avatar !== undefined) authUpdate.data.avatar_url = avatar;
    
    await supabase.auth.updateUser(authUpdate);
  }

  return data;
};

