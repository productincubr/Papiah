import express from "express";
import * as paymentController from "./payment.controller.js";
import { verifyToken } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public webhook route (must not be authenticated)
router.post("/webhook", paymentController.webhook);

// Protected payment routes
router.post("/create-razorpay-order", verifyToken, paymentController.createOrder);
router.post("/verify", verifyToken, paymentController.verify);

export default router;
