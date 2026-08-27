import "dotenv/config";
import express from "express";

import newsRouter from "./routes/newsRoutes.js"
import app from "./app.js"


app.listen(5000, () => {
    console.log("Server running on port 5000");
});