import express from "express";
import * as orderController from "./order.controller.js";
import { verifyToken } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Apply auth middleware to all order routes
router.use(verifyToken);

router.post("/create", orderController.create);
router.get("/my-orders", orderController.myOrders);
router.get("/:id", orderController.getById);
router.patch("/:id/status", orderController.updateStatus);
router.patch("/:id/cancel", orderController.cancel);

export default router;
