import express from "express";
import * as collectionController from "./collection.controller.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", collectionController.getAll);
router.get("/featured", collectionController.getFeatured);
router.get("/:slug", collectionController.getBySlug);
router.post("/", verifyToken, isAdmin, collectionController.create);
router.patch("/:id", verifyToken, isAdmin, collectionController.update);
router.delete("/:id", verifyToken, isAdmin, collectionController.remove);

export default router;
