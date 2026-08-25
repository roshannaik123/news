import "dotenv/config";
import express from "express";

import newsRouter from "./routes/newsRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/news", newsRouter);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});