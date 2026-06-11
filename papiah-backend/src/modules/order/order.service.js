import { supabase } from "../../config/supabase.js";
import * as cartService from "../cart/cart.service.js";
import * as productService from "../product/product.service.js";
import * as couponService from "../coupon/coupon.service.js";
import * as shippingService from "../shipping/shipping.service.js";

/**
 * Creates an order from the user's current cart.
 */
export const createOrder = async (userId, { addressId, couponCode, shippingSpeed = "standard", notes = "", paymentMethod = "Razorpay" }) => {
  // 1. Get user cart
  const cart = await cartService.getCart(userId);
  if (!cart.items || cart.items.length === 0) {
    throw new Error("Cannot place order. Your cart is empty.");
  }

  // 2. Check stock for all items
  for (const item of cart.items) {
    const stockStatus = await productService.checkStock(item.products.id, item.quantity);
    if (!stockStatus.inStock) {
      throw new Error(`Insufficient stock for product: "${stockStatus.title}". Only ${stockStatus.currentStock} left in stock.`);
    }
  }

  const subtotal = cart.subtotal;

  // 3. Apply coupon if provided
  let discount = 0.00;
  let validatedCoupon = null;
  if (couponCode) {
    try {
      validatedCoupon = await couponService.validateCoupon(couponCode, subtotal);
      discount = validatedCoupon.discountAmount;
    } catch (couponErr) {
      throw new Error(`Coupon application failed: ${couponErr.message}`);
    }
  }

  // 4. Calculate shipping, tax, and total
  const shipping = shippingService.calculateShipping(subtotal, shippingSpeed);
  const taxRate = 0.18; // 18% GST (standard in India for retail/stationery)
  const tax = parseFloat(((subtotal - discount) * taxRate).toFixed(2));
  const total = parseFloat((subtotal - discount + shipping + tax).toFixed(2));

  // Generate unique order number (e.g., PAP-1709-XXXX)
  const timestamp = Date.now().toString().slice(-4);
  const randomStr = Math.floor(1000 + Math.random() * 9000).toString();
  const orderNumber = `PAP-${timestamp}-${randomStr}`;

  // 5. Create order in public.orders table
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        user_id: userId,
        order_number: orderNumber,
        address_id: addressId,
        subtotal,
        shipping,
        tax,
        discount,
        total,
        payment_method: paymentMethod,
        payment_status: "pending",
        order_status: "pending",
        notes,
      },
    ])
    .select()
    .single();

  if (orderError) throw orderError;

  const orderId = order.id;

  // 6. Create order_items snapshot in public.order_items table
  const orderItemsToInsert = cart.items.map((item) => ({
    order_id: orderId,
    product_id: item.products.id,
    product_title: item.products.title,
    product_price: item.products.price,
    quantity: item.quantity,
    total: parseFloat((item.products.price * item.quantity).toFixed(2)),
  }));

  const { error: itemsError } = await supabase.from("order_items").insert(orderItemsToInsert);
  if (itemsError) {
    // Rollback order if items fail to insert
    await supabase.from("orders").delete().eq("id", orderId);
    throw itemsError;
  }

  // 7. Decrease inventory for each item
  for (const item of cart.items) {
    await productService.decreaseStock(item.products.id, item.quantity);
  }

  // 8. If coupon was applied, increment its use count
  if (validatedCoupon) {
    await couponService.incrementCouponUses(couponCode);
  }

  // 9. Clear the user's cart
  await cartService.clearCart(userId);

  return getOrderById(orderId);
};

/**
 * Retrieves a single order by ID, including nested address and order items.
 */
export const getOrderById = async (orderId) => {
  const { data: order, error } = await supabase
    .from("orders")
    .select(`
      *,
      addresses (*),
      order_items (*)
    `)
    .eq("id", orderId)
    .single();

  if (error) throw error;

  // Append estimated delivery date & tracking milestone details
  order.estimated_delivery = shippingService.estimateDeliveryDate(
    order.shipping > 49 ? "express" : "standard"
  );
  order.tracking_timeline = shippingService.generateTrackingStatus(
    order.order_status,
    order.tracking_number
  );

  return order;
};

/**
 * Retrieves all orders placed by a specific user.
 */
export const getUserOrders = async (userId) => {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (*)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * Updates the status of an order.
 */
export const updateOrderStatus = async (orderId, status) => {
  const { data, error } = await supabase
    .from("orders")
    .update({ order_status: status })
    .eq("id", orderId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Cancels an order, restocks inventory, and updates payment/order status.
 */
export const cancelOrder = async (userId, orderId) => {
  // Fetch order details first
  const order = await getOrderById(orderId);

  // Security Check: Verify user owns the order (skip if admin checks are done outside)
  if (userId && order.user_id !== userId) {
    throw new Error("Unauthorized: You do not own this order.");
  }

  if (order.order_status === "delivered" || order.order_status === "shipped") {
    throw new Error("Cannot cancel order that has already been shipped or delivered.");
  }

  if (order.order_status === "cancelled") {
    return order; // already cancelled
  }

  // 1. Update order status to cancelled
  const { data: updatedOrder, error: updateError } = await supabase
    .from("orders")
    .update({
      order_status: "cancelled",
      payment_status: order.payment_status === "paid" ? "refunded" : order.payment_status,
    })
    .eq("id", orderId)
    .select()
    .single();

  if (updateError) throw updateError;

  // 2. Restock inventory
  for (const item of order.order_items) {
    if (item.product_id) {
      await productService.increaseStock(item.product_id, item.quantity);
    }
  }

  return updatedOrder;
};
