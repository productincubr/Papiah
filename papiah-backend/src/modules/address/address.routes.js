import express from "express";
import * as addressController from "./address.controller.js";
import { verifyToken } from "../../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected by verifyToken middleware since addresses belong to a user
router.get("/", verifyToken, addressController.getAddresses);
router.post("/", verifyToken, addressController.createAddress);
router.patch("/:id", verifyToken, addressController.updateAddress);
router.delete("/:id", verifyToken, addressController.deleteAddress);
router.patch("/:id/default", verifyToken, addressController.setDefaultAddress);

export default router;
