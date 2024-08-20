import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import todoRouter from "./routes/todo.route";
import { connectDB } from "./config/database";

dotenv.config();
const PORT = process.env.PORT;

// mongoose
//   .connect(process.env.MONGO_URI as string)
//   .then(() => console.log("mongodb connection success"))
//   .catch(() => console.log("mongodb connection failed"));
const app = express();

app.use(express.json());
app.use(cookieParser());

connectDB();
app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos", todoRouter);

app.listen(PORT, async () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
