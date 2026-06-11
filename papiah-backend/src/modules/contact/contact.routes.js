import express from "express";
import * as contactController from "./contact.controller.js";

const router = express.Router();

router.post("/", contactController.submitMessage);

export default router;
