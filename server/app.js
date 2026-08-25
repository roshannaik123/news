import express from "express";
import cors from "cors";
import newsRoutes from "./routes/newsRoutes.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);


app.use(express.json());

app.use("/api/news", newsRoutes);
app.use(errorMiddleware);


export default app;