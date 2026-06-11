import { supabase } from "../../config/supabase.js";

/**
 * Helper: Gets the user's cart or creates one if it doesn't exist.
 */
export const getOrCreateCart = async (userId) => {
  // Try to find the cart
  let { data: cart, error } = await supabase
    .from("carts")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;

  // Create one if it does not exist
  if (!cart) {
    const { data: newCart, error: createError } = await supabase
      .from("carts")
      .insert([{ user_id: userId }])
      .select()
      .single();

    if (createError) throw createError;
    cart = newCart;
  }

  return cart;
};

/**
 * Adds a product to the user's cart.
 */
export const addToCart = async (userId, productId, quantity = 1) => {
  const cart = await getOrCreateCart(userId);

  // Check if item already exists in cart
  const { data: existingItem, error: fetchError } = await supabase
    .from("cart_items")
    .select("*")
    .eq("cart_id", cart.id)
    .eq("product_id", productId)
    .maybeSingle();

  if (fetchError) throw fetchError;

  if (existingItem) {
    // Update quantity
    const newQty = existingItem.quantity + quantity;
    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity: newQty })
      .eq("id", existingItem.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {
    // Insert new item
    const { data, error } = await supabase
      .from("cart_items")
      .insert([
        {
          cart_id: cart.id,
          product_id: productId,
          quantity: quantity,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

/**
 * Retrieves the user's cart with details of all products inside it.
 */
export const getCart = async (userId) => {
  const cart = await getOrCreateCart(userId);

  const { data: items, error } = await supabase
    .from("cart_items")
    .select(`
      id,
      quantity,
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
    .eq("cart_id", cart.id);

  if (error) throw error;

  // Calculate totals
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.products ? item.products.price * item.quantity : 0);
  }, 0);

  return {
    cartId: cart.id,
    userId: cart.user_id,
    items,
    subtotal,
  };
};

/**
 * Updates the quantity of a cart item.
 */
export const updateCartItem = async (userId, itemId, quantity) => {
  const cart = await getOrCreateCart(userId);

  const { data, error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", itemId)
    .eq("cart_id", cart.id) // security check: ensure it belongs to the user's cart
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Removes a single item from the cart.
 */
export const removeCartItem = async (userId, itemId) => {
  const cart = await getOrCreateCart(userId);

  const { data, error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", itemId)
    .eq("cart_id", cart.id) // security check
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Clears all items in the user's cart.
 */
export const clearCart = async (userId) => {
  const cart = await getOrCreateCart(userId);

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("cart_id", cart.id);

  if (error) throw error;
  return { message: "Cart cleared successfully" };
};
