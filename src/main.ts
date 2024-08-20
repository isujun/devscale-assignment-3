import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import todoRouter from "./routes/todo.route";
import { connectDB } from "./config/database";

dotenv.config();
const PORT = process.env.PORT;
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos", todoRouter);

app.listen(PORT, async () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
