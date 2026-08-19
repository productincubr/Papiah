import express from "express";
import * as userController from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/refresh-token", userController.refreshToken);
router.post("/forgot-password", userController.requestPasswordReset);

// OAuth Social Logins
router.get("/auth/:provider", userController.socialLogin);
router.get("/auth/callback", userController.authCallback);

// Protected routes
router.put("/profile", verifyToken, userController.updateProfile);

export default router;

