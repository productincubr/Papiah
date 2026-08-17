import { supabase, createUserClient } from "../config/supabase.js";

/**
 * Register a new user with email, password, and profile metadata.
 * The on_auth_user_created trigger automatically inserts the record into public.users.
 *
 * Uses the admin API with email_confirm: true because this project has no
 * transactional email sending configured, so the standard signUp() flow
 * would leave every account stuck in an unconfirmed, unable-to-login state.
 * Admin-created users have no session, so we sign in immediately after,
 * on a throwaway client (see loginUser for why).
 */
export const registerUser = async ({ email, password, firstName, lastName, phone, avatar }) => {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      avatar_url: avatar,
    },
  });

  if (error) throw error;

  const { data: sessionData, error: signInError } = await createUserClient().auth.signInWithPassword({ email, password });
  if (signInError) throw signInError;

  return sessionData;
};

/**
 * Log in an existing user with email and password.
 * Returns the session containing access token, refresh token, and user details.
 *
 * Runs on a fresh, throwaway client rather than the shared admin `supabase`
 * client: signInWithPassword persists its session on whatever client it's
 * called on, and the shared client is reused for every request server-wide.
 */
export const loginUser = async ({ email, password }) => {
  const { data, error } = await createUserClient().auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

/**
 * Log out the currently authenticated user session (revokes the refresh token server-side).
 */
export const logoutUser = async (accessToken) => {
  if (accessToken) {
    const client = createUserClient();
    const { error: setSessionError } = await client.auth.setSession({
      access_token: accessToken,
      refresh_token: "", // not strictly needed for signout
    });
    if (setSessionError) throw setSessionError;

    const { error } = await client.auth.signOut();
    if (error) throw error;
  }

  return { message: "Successfully logged out" };
};

/**
 * Trigger a password reset email for the specified email address.
 */
export const forgotPassword = async (email, redirectTo) => {
  const { data, error } = await createUserClient().auth.resetPasswordForEmail(email, {
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

  // 2. Sync changes back to Supabase Auth metadata via the admin API
  // (auth.updateUser() acts on "the client's current session", which the
  // shared admin client intentionally never holds; admin.updateUserById
  // is the stateless equivalent for a client authenticated via secret key).
  if (firstName !== undefined || lastName !== undefined || avatar !== undefined) {
    const metadataUpdate = {};
    if (firstName !== undefined) metadataUpdate.first_name = firstName;
    if (lastName !== undefined) metadataUpdate.last_name = lastName;
    if (avatar !== undefined) metadataUpdate.avatar_url = avatar;

    await supabase.auth.admin.updateUserById(userId, { user_metadata: metadataUpdate });
  }

  return data;
};
