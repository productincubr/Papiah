import express from "express";
import * as categoryController from "./category.controller.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", categoryController.getAll);
router.get("/:slug", categoryController.getBySlug);
router.post("/", verifyToken, isAdmin, categoryController.create);
router.patch("/:id", verifyToken, isAdmin, categoryController.update);
router.delete("/:id", verifyToken, isAdmin, categoryController.remove);

export default router;
