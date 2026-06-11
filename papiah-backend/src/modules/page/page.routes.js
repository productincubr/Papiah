import express from "express";
import * as pageController from "./page.controller.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Publicly readable endpoints (for legal terms, help pages, custom static copy)
router.get("/", pageController.getAll);
router.get("/:slug", pageController.getBySlug);

// Admin-only operations to manage static contents
router.post("/", verifyToken, isAdmin, pageController.create);
router.patch("/:id", verifyToken, isAdmin, pageController.update);
router.delete("/:id", verifyToken, isAdmin, pageController.remove);

export default router;
