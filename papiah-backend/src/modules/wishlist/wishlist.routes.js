import express from "express";
import * as wishlistController from "./wishlist.controller.js";
import { verifyToken } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Apply auth middleware to all wishlist routes
router.use(verifyToken);

router.get("/", wishlistController.get);
router.post("/:productId", wishlistController.add);
router.delete("/:productId", wishlistController.remove);
router.get("/check/:productId", wishlistController.checkStatus);

export default router;
