import express from "express";
import authGuard from "../../shared/authGuard.js";
import { medicalPanel } from "./panels.controller.js";

const router = express.Router();
router.post("/medical-panel", authGuard, medicalPanel);

export default router;
