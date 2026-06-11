import { supabase } from "../../config/supabase.js";

/**
 * Saves a contact message to the database.
 */
export const saveMessage = async ({ name, email, subject, message }) => {
  const { data, error } = await supabase
    .from("contact_messages")
    .insert([
      {
        name,
        email: email.toLowerCase(),
        subject,
        message,
        status: "pending",
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};
