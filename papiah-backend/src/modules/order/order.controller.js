import * as orderService from "./order.service.js";

export const create = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { addressId, couponCode, shippingSpeed, notes, paymentMethod } = req.body;
    if (!addressId) {
      return res.status(400).json({ error: "Delivery addressId is required" });
    }

    const order = await orderService.createOrder(userId, {
      addressId,
      couponCode,
      shippingSpeed,
      notes,
      paymentMethod,
    });

    return res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Create Order Error:", error);
    return res.status(400).json({ error: error.message || "Failed to place order" });
  }
};

export const myOrders = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const orders = await orderService.getUserOrders(userId);
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Get User Orders Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getById = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const order = await orderService.getOrderById(id);

    // Security Check: Verify user owns the order
    if (order.user_id !== userId) {
      return res.status(403).json({ error: "Access denied. This order belongs to another account." });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error("Get Order By ID Error:", error);
    return res.status(error.status || 404).json({ error: error.message || "Order not found" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status field is required" });
    }

    const order = await orderService.updateOrderStatus(id, status);
    return res.status(200).json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Update Order Status Error:", error);
    return res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};

export const cancel = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const order = await orderService.cancelOrder(userId, id);

    return res.status(200).json({ message: "Order cancelled successfully", order });
  } catch (error) {
    console.error("Cancel Order Error:", error);
    return res.status(400).json({ error: error.message || "Failed to cancel order" });
  }
};
