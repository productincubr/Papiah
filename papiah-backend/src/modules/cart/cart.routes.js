import express from "express";
import * as cartController from "./cart.controller.js";
import { verifyToken } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Apply auth middleware to all cart routes
router.use(verifyToken);

router.get("/", cartController.get);
router.post("/add", cartController.add);
router.patch("/:itemId", cartController.update);
router.delete("/clear", cartController.clear);
router.delete("/:itemId", cartController.remove);

export default router;
