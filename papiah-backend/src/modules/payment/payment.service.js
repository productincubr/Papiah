import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import { supabase } from "../../config/supabase.js";
import * as orderService from "../order/order.service.js";

dotenv.config();

// Initialize Razorpay (checks for keys, provides dummy values to prevent crashing during build if keys are empty)
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_mock_id",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "mock_secret",
});

/**
 * Creates a Razorpay order for a given system order ID.
 */
export const createRazorpayOrder = async (orderId) => {
  const order = await orderService.getOrderById(orderId);

  const amountInPaise = Math.round(order.total * 100);

  const options = {
    amount: amountInPaise,
    currency: "INR",
    receipt: order.order_number,
    notes: {
      orderId: order.id,
      userId: order.user_id,
    },
  };

  const razorpayOrder = await razorpay.orders.create(options);
  return razorpayOrder;
};

/**
 * Verifies the Razorpay payment signature.
 */
export const verifySignature = async ({ razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId }) => {
  const text = `${razorpayOrderId}|${razorpayPaymentId}`;
  
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "mock_secret")
    .update(text)
    .digest("hex");

  if (generatedSignature === razorpaySignature) {
    // 1. Update system order status to "paid" and "processing"
    const { data: updatedOrder, error } = await supabase
      .from("orders")
      .update({
        payment_status: "paid",
        order_status: "processing",
        notes: `Razorpay Payment ID: ${razorpayPaymentId}`,
      })
      .eq("id", orderId)
      .select()
      .single();

    if (error) throw error;
    return { verified: true, order: updatedOrder };
  } else {
    // Update system order to "failed"
    await supabase
      .from("orders")
      .update({ payment_status: "failed" })
      .eq("id", orderId);

    throw new Error("Payment signature verification failed");
  }
};

/**
 * Validates and processes a Razorpay Webhook notification.
 */
export const handleWebhook = async (rawBody, signatureHeader) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "mock_secret";

  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("hex");

  if (expectedSignature !== signatureHeader) {
    throw new Error("Webhook signature validation failed");
  }

  const eventData = JSON.parse(rawBody);

  // Process captured/paid event
  if (eventData.event === "order.paid" || eventData.event === "payment.captured") {
    const payment = eventData.payload.payment.entity;
    const orderNumber = payment.notes?.orderNumber || eventData.payload.order?.entity?.receipt;
    const razorpayPaymentId = payment.id;

    if (orderNumber) {
      // Find order by order number and update to paid
      const { data: order, error: fetchErr } = await supabase
        .from("orders")
        .select("id, payment_status")
        .eq("order_number", orderNumber)
        .single();

      if (!fetchErr && order && order.payment_status !== "paid") {
        await supabase
          .from("orders")
          .update({
            payment_status: "paid",
            order_status: "processing",
            notes: `Paid via Webhook. Razorpay Payment ID: ${razorpayPaymentId}`,
          })
          .eq("id", order.id);
      }
    }
  }

  return { success: true };
};
