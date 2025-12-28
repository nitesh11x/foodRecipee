import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGODB_URI;

export const connectDB = () => {
  mongoose
    .connect(URI, { dbName: "Food_Recipe" })
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
};
