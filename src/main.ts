import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import todoRouter from "./routes/todo.route";

dotenv.config();
const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("mongodb connection success"))
  .catch(() => console.log("mongodb connection failed"));

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/todos", todoRouter);

app.listen(PORT, async () => {
  console.log(`App is listeing on http://localhost:${PORT}`);
});
