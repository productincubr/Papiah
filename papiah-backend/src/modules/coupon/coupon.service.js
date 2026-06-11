import { supabase } from "../../config/supabase.js";

/**
 * Validates a coupon code and calculates the discount amount.
 */
export const validateCoupon = async (code, orderAmount) => {
  const { data: coupon, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("code", code.toUpperCase())
    .maybeSingle();

  if (error) throw error;
  if (!coupon) {
    throw new Error("Invalid coupon code");
  }

  if (!coupon.is_active) {
    throw new Error("This coupon is no longer active");
  }

  if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
    throw new Error("This coupon has expired");
  }

  if (coupon.max_uses && coupon.used_count >= coupon.max_uses) {
    throw new Error("This coupon has reached its maximum usage limit");
  }

  if (orderAmount < coupon.minimum_order) {
    throw new Error(`Minimum order value of ₹${coupon.minimum_order} is required to use this coupon`);
  }

  let discountAmount = 0;
  if (coupon.type === "percentage") {
    discountAmount = (orderAmount * parseFloat(coupon.value)) / 100;
  } else if (coupon.type === "fixed") {
    discountAmount = parseFloat(coupon.value);
  }

  // Ensure discount doesn't exceed order amount
  discountAmount = Math.min(discountAmount, orderAmount);

  return {
    valid: true,
    couponId: coupon.id,
    code: coupon.code,
    type: coupon.type,
    value: coupon.value,
    discountAmount: parseFloat(discountAmount.toFixed(2)),
  };
};

/**
 * Creates a new coupon.
 */
export const createCoupon = async ({ code, type, value, minimumOrder, maxUses, expiresAt, isActive }) => {
  const { data, error } = await supabase
    .from("coupons")
    .insert([
      {
        code: code.toUpperCase(),
        type,
        value,
        minimum_order: minimumOrder !== undefined ? minimumOrder : 0,
        max_uses: maxUses || null,
        used_count: 0,
        expires_at: expiresAt || null,
        is_active: isActive !== undefined ? isActive : true,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Retrieves all coupons.
 */
export const getAllCoupons = async () => {
  const { data, error } = await supabase
    .from("coupons")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * Increments the usage count of a coupon.
 */
export const incrementCouponUses = async (code) => {
  const { data: coupon, error: fetchError } = await supabase
    .from("coupons")
    .select("id, used_count")
    .eq("code", code.toUpperCase())
    .single();

  if (fetchError) throw fetchError;

  const { data, error } = await supabase
    .from("coupons")
    .update({ used_count: coupon.used_count + 1 })
    .eq("id", coupon.id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
