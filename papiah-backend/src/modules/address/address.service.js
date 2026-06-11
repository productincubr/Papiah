import { supabase } from "../../config/supabase.js";

/**
 * Fetch all addresses of a user
 */
export const getAddresses = async (userId) => {
  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", userId)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * Fetch a single address by id and verify ownership
 */
export const getAddressById = async (userId, addressId) => {
  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("id", addressId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data;
};

/**
 * Create a new address for a user
 */
export const createAddress = async (userId, addressData) => {
  // Check if user has any existing addresses
  const { data: existingAddresses, error: countError } = await supabase
    .from("addresses")
    .select("id")
    .eq("user_id", userId);

  if (countError) throw countError;

  // If first address, make it default automatically
  let isDefault = addressData.is_default || false;
  if (!existingAddresses || existingAddresses.length === 0) {
    isDefault = true;
  }

  // If this address is set as default, unset other default addresses
  if (isDefault) {
    await unsetOtherDefaults(userId);
  }

  const { data, error } = await supabase
    .from("addresses")
    .insert([
      {
        user_id: userId,
        label: addressData.label || "Home",
        full_name: addressData.full_name,
        phone: addressData.phone,
        address_line1: addressData.address_line1,
        address_line2: addressData.address_line2 || null,
        city: addressData.city,
        state: addressData.state,
        country: addressData.country || "India",
        postal_code: addressData.postal_code,
        is_default: isDefault,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Update an existing address of a user
 */
export const updateAddress = async (userId, addressId, addressData) => {
  // First verify address exists and belongs to user
  const existing = await getAddressById(userId, addressId);
  if (!existing) {
    throw new Error("Address not found or access denied.");
  }

  let isDefault = addressData.is_default;

  // If this address is set as default, unset other default addresses
  if (isDefault) {
    await unsetOtherDefaults(userId);
  }

  // Build fields to update (only update provided fields)
  const updateFields = {};
  if (addressData.label !== undefined) updateFields.label = addressData.label;
  if (addressData.full_name !== undefined) updateFields.full_name = addressData.full_name;
  if (addressData.phone !== undefined) updateFields.phone = addressData.phone;
  if (addressData.address_line1 !== undefined) updateFields.address_line1 = addressData.address_line1;
  if (addressData.address_line2 !== undefined) updateFields.address_line2 = addressData.address_line2;
  if (addressData.city !== undefined) updateFields.city = addressData.city;
  if (addressData.state !== undefined) updateFields.state = addressData.state;
  if (addressData.country !== undefined) updateFields.country = addressData.country;
  if (addressData.postal_code !== undefined) updateFields.postal_code = addressData.postal_code;
  if (isDefault !== undefined) updateFields.is_default = isDefault;

  const { data, error } = await supabase
    .from("addresses")
    .update(updateFields)
    .eq("id", addressId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Delete an address and handle resetting of default
 */
export const deleteAddress = async (userId, addressId) => {
  // First verify address exists and belongs to user
  const existing = await getAddressById(userId, addressId);
  if (!existing) {
    throw new Error("Address not found or access denied.");
  }

  const { error } = await supabase
    .from("addresses")
    .delete()
    .eq("id", addressId)
    .eq("user_id", userId);

  if (error) throw error;

  // If the deleted address was the default, make another one default
  if (existing.is_default) {
    const { data: remaining, error: fetchError } = await supabase
      .from("addresses")
      .select("id")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (fetchError) throw fetchError;

    if (remaining && remaining.length > 0) {
      await setDefaultAddress(userId, remaining[0].id);
    }
  }

  return { success: true };
};

/**
 * Set an address as the default
 */
export const setDefaultAddress = async (userId, addressId) => {
  // First verify address exists and belongs to user
  const existing = await getAddressById(userId, addressId);
  if (!existing) {
    throw new Error("Address not found or access denied.");
  }

  // Unset all other defaults first
  await unsetOtherDefaults(userId);

  // Set this one as default
  const { data, error } = await supabase
    .from("addresses")
    .update({ is_default: true })
    .eq("id", addressId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Helper: Sets is_default = false for all addresses of a user
 */
const unsetOtherDefaults = async (userId) => {
  const { error } = await supabase
    .from("addresses")
    .update({ is_default: false })
    .eq("user_id", userId);

  if (error) throw error;
};
