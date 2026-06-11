import { supabase } from "../../config/supabase.js";

/**
 * Subscribes an email to the newsletter.
 */
export const subscribeEmail = async (email) => {
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .insert([
      {
        email: email.toLowerCase(),
        is_subscribed: true,
      },
    ])
    .select()
    .single();

  if (error) {
    // If it's a unique constraint violation, they're already subscribed
    if (error.code === "23505") {
      return { message: "Email is already subscribed to our newsletter", email };
    }
    throw error;
  }

  return data;
};
