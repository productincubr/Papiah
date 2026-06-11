import express from "express";
import * as profileController from "./profile.controller.js";
import { verifyToken } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/summary", verifyToken, profileController.getSummary);
router.get("/rewards", verifyToken, profileController.getRewards);
router.post("/rewards/redeem", verifyToken, profileController.redeemPoints);

export default router;
