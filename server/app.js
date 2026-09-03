import express from "express";
import cors from "cors";
import newsRoutes from "./routes/newsRoutes.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
const app = express();

app.use(cors());


app.use(express.json());
app.get("/", (req, res) => {
  res.send("WebDev Times Backend is running");
});
app.use("/api/news",newsRoutes);
app.use(errorMiddleware);


export default app;