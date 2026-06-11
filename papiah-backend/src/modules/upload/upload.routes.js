import express from "express";
import { upload } from "./upload.middleware.js";
import { uploadSingle, uploadAvatar } from "./upload.controller.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Only authenticated admins can upload images
router.post("/", verifyToken, isAdmin, upload.single("image"), uploadSingle);

// Authenticated users can upload their profile avatars
router.post("/avatar", verifyToken, upload.single("image"), uploadAvatar);

export default router;
