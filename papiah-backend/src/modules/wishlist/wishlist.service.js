import { supabase } from "../../config/supabase.js";

/**
 * Adds a product to the user's wishlist.
 */
export const addToWishlist = async (userId, productId) => {
  const { data, error } = await supabase
    .from("wishlists")
    .insert([
      {
        user_id: userId,
        product_id: productId,
      },
    ])
    .select()
    .single();

  if (error) {
    // If it's a unique constraint violation, it's already wishlisted
    if (error.code === "23505") {
      return { message: "Product is already in wishlist" };
    }
    throw error;
  }
  return data;
};

/**
 * Removes a product from the user's wishlist.
 */
export const removeFromWishlist = async (userId, productId) => {
  const { data, error } = await supabase
    .from("wishlists")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Retrieves the user's wishlist, joining product details.
 */
export const getUserWishlist = async (userId) => {
  const { data, error } = await supabase
    .from("wishlists")
    .select(`
      id,
      created_at,
      products (
        id,
        title,
        slug,
        price,
        compare_price,
        cover_image,
        stock
      )
    `)
    .eq("user_id", userId);

  if (error) throw error;
  return data;
};

/**
 * Checks if a specific product is currently wishlisted by the user.
 */
export const isProductWishlisted = async (userId, productId) => {
  const { data, error } = await supabase
    .from("wishlists")
    .select("id")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .maybeSingle();

  if (error) throw error;
  return !!data;
};
