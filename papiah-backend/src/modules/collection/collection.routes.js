import express from "express";
import * as collectionController from "./collection.controller.js";

const router = express.Router();

router.get("/", collectionController.getAll);
router.get("/featured", collectionController.getFeatured);
router.get("/:slug", collectionController.getBySlug);
router.post("/", collectionController.create);
router.patch("/:id", collectionController.update);
router.delete("/:id", collectionController.remove);

export default router;
