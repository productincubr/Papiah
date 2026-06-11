import express from "express";
import * as couponController from "./coupon.controller.js";

const router = express.Router();

router.post("/validate", couponController.validate);
router.get("/", couponController.getAll);
router.post("/", couponController.create);

export default router;
