import express from "express";
import * as productController from "./product.controller.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Query and retrieval
router.get("/", productController.query);
router.get("/all", productController.getAll);
router.get("/featured", productController.getFeatured);
router.get("/bestsellers", productController.getBestSellers);
router.get("/new", productController.getNew);
router.get("/stock/:id", productController.checkStockStatus);

// Fetch specific product
router.get("/:slug", productController.getBySlug);
router.get("/id/:id", productController.getById);

// Admin operations
router.post("/", verifyToken, isAdmin, productController.create);
router.patch("/:id", verifyToken, isAdmin, productController.update);
router.delete("/:id", verifyToken, isAdmin, productController.remove);

export default router;
