import express from "express";
import { generateAINews } from "../controller/aiController.js";

const router = express.Router();

router.post("/news", generateAINews);

export default router;