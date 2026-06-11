import express from "express";
import * as reviewController from "./review.controller.js";
import { verifyToken } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/product/:productId", reviewController.getByProduct);
router.get("/product/:productId/stats", reviewController.getStats);

// Protected routes (require login)
router.post("/", verifyToken, reviewController.create);
router.patch("/:reviewId", verifyToken, reviewController.update);
router.delete("/:reviewId", verifyToken, reviewController.remove);

export default router;
