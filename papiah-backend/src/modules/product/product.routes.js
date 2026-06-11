import express from "express";
import * as productController from "./product.controller.js";

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
router.post("/", productController.create);
router.patch("/:id", productController.update);
router.delete("/:id", productController.remove);

export default router;
