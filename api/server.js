import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import userRouter from "./routes/user.js";
import recipeRouter from "./routes/recipe.js";
import cors from "cors";

const app = express();

dotenv.config();

app.use(express.json());

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api", userRouter);

app.use("/api", recipeRouter);

connectDB();

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
