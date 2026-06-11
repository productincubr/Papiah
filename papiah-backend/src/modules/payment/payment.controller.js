import * as paymentService from "./payment.service.js";

export const createOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ error: "System orderId is required" });
    }

    const razorpayOrder = await paymentService.createRazorpayOrder(orderId);
    return res.status(200).json(razorpayOrder);
  } catch (error) {
    console.error("Create Razorpay Order Error:", error);
    return res.status(500).json({ error: error.message || "Failed to initiate payment" });
  }
};

export const verify = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = req.body;
    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !orderId) {
      return res.status(400).json({ error: "Payment verification credentials are incomplete" });
    }

    const result = await paymentService.verifySignature({
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      orderId,
    });

    return res.status(200).json({ message: "Payment verified successfully", ...result });
  } catch (error) {
    console.error("Verify Payment Error:", error);
    return res.status(400).json({ error: error.message || "Payment verification failed" });
  }
};

export const webhook = async (req, res) => {
  try {
    const signatureHeader = req.headers["x-razorpay-signature"];
    if (!signatureHeader) {
      return res.status(400).json({ error: "Missing signature header" });
    }

    // Convert body to string if it is an object (or use raw body if middleware is configured)
    const rawBody = typeof req.body === "string" ? req.body : JSON.stringify(req.body);

    const result = await paymentService.handleWebhook(rawBody, signatureHeader);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Payment Webhook Error:", error);
    return res.status(400).json({ error: error.message || "Webhook handling failed" });
  }
};
