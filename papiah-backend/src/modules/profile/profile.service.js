import { supabase } from "../../config/supabase.js";

/**
 * Retrieves the aggregated user profile dashboard details.
 */
export const getProfileSummary = async (userId) => {
  // 1. Fetch user profile
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (userError) throw userError;

  // 2. Fetch recent orders (limit to 5)
  const { data: recentOrders, error: orderError } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(5);

  if (orderError) throw orderError;

  // 3. Fetch saved addresses
  const { data: savedAddresses, error: addressError } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (addressError) throw addressError;

  // 4. Fetch wishlist count
  const { count: wishlistCount, error: wishlistError } = await supabase
    .from("wishlists")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (wishlistError) throw wishlistError;

  // 5. Extract default address
  const defaultAddress = savedAddresses.find((addr) => addr.is_default) || null;

  return {
    user,
    recentOrders,
    savedAddresses,
    wishlistCount: wishlistCount || 0,
    rewardPoints: user.reward_points || 0,
    defaultAddress,
  };
};

/**
 * Retrieves the reward transactions history for a specific user.
 */
export const getRewardsHistory = async (userId) => {
  const { data, error } = await supabase
    .from("reward_transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * Redeems user reward points for a fixed coupon code.
 */
export const redeemRewardPoints = async (userId, redeemType = "100_coupon") => {
  // 1. Fetch current user points
  const { data: user, error: fetchError } = await supabase
    .from("users")
    .select("reward_points")
    .eq("id", userId)
    .single();

  if (fetchError) throw fetchError;

  let pointsRequired = 500;
  let couponValue = 100.00;
  let minOrder = 300.00;

  if (redeemType === "250_coupon") {
    pointsRequired = 1000;
    couponValue = 250.00;
    minOrder = 600.00;
  } else if (redeemType === "500_coupon") {
    pointsRequired = 1800;
    couponValue = 500.00;
    minOrder = 1200.00;
  }

  if ((user.reward_points || 0) < pointsRequired) {
    throw new Error(`Insufficient points. You need ${pointsRequired} points but have ${user.reward_points || 0} points.`);
  }

  // 2. Subtract points from user profile
  const newPoints = user.reward_points - pointsRequired;
  const { error: updateError } = await supabase
    .from("users")
    .update({ reward_points: newPoints })
    .eq("id", userId);

  if (updateError) throw updateError;

  // 3. Create a transaction record
  const { error: txError } = await supabase
    .from("reward_transactions")
    .insert([
      {
        user_id: userId,
        points: -pointsRequired,
        type: "redeemed",
        reference_id: `REDEEM-${redeemType.toUpperCase()}`
      }
    ]);

  if (txError) {
    // Attempt rollback points
    await supabase.from("users").update({ reward_points: user.reward_points }).eq("id", userId);
    throw txError;
  }

  // 4. Create coupon code
  const codeSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  const couponCode = `PAP-${pointsRequired}-${codeSuffix}`;

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30); // 30 days expiry

  // We import createCoupon dynamically or at the top of the file to prevent circular dependencies
  const { createCoupon } = await import("../coupon/coupon.service.js");

  const coupon = await createCoupon({
    code: couponCode,
    type: "fixed",
    value: couponValue,
    minimumOrder: minOrder,
    maxUses: 1,
    expiresAt,
    isActive: true
  });

  return {
    couponCode: coupon.code,
    couponValue,
    pointsRedeemed: pointsRequired,
    remainingPoints: newPoints,
    expiresAt: expiresAt.toISOString()
  };
};
