import express from "express";
import * as categoryController from "./category.controller.js";
import { verifyToken } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", categoryController.getAll);
router.get("/:slug", categoryController.getBySlug);
router.post("/", categoryController.create);
router.patch("/:id", categoryController.update);
router.delete("/:id", categoryController.remove);

export default router;
