import express from "express";
import * as couponController from "./coupon.controller.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/validate", couponController.validate);
router.get("/", verifyToken, isAdmin, couponController.getAll);
router.post("/", verifyToken, isAdmin, couponController.create);

export default router;
