import express from "express";
import { validateNewsQuery } from "../middleware/validateNewsQuery.js";
import { getAllNews } from "../controller/newsController.js";

const router = express.Router();

router.get("/",validateNewsQuery, getAllNews);

export default router;