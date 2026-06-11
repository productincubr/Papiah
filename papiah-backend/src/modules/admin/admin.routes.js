import express from "express";
import * as adminController from "./admin.controller.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Apply auth & admin checks to all admin endpoints
router.use(verifyToken, isAdmin);

router.get("/dashboard", adminController.getDashboard);
router.get("/orders", adminController.getOrders);
router.get("/products", adminController.getProducts);
router.get("/customers", adminController.getCustomers);
router.patch("/orders/:id/status", adminController.updateOrderStatus);

export default router;
