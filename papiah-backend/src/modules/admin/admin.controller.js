import * as adminService from "./admin.service.js";
import * as orderService from "../order/order.service.js";

export const getDashboard = async (req, res) => {
  try {
    const stats = await adminService.getDashboardStats();
    return res.status(200).json(stats);
  } catch (error) {
    console.error("Admin Dashboard Stats Error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await adminService.getAdminOrders();
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Admin Get Orders Error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await adminService.getAdminProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Admin Get Products Error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await adminService.getAdminCustomers();
    return res.status(200).json(customers);
  } catch (error) {
    console.error("Admin Get Customers Error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status field is required" });
    }

    const order = await orderService.updateOrderStatus(id, status);
    return res.status(200).json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Admin Update Order Status Error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
