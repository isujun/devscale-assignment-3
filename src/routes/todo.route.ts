import express from "express";
import { TodoController } from "../controllers/todo.controller";
import { authMiddleware } from "../middleware/authenticate";

const todoRouter = express.Router();
todoRouter.use(authMiddleware);

todoRouter.get("/", TodoController.handleGetAllTodos);
todoRouter.get("/:id", TodoController.handleGetOneTodo);
todoRouter.post("/", TodoController.handleCreateTodo);
todoRouter.patch("/:id", TodoController.handleUpdateTodo);
todoRouter.delete("/:id", TodoController.handleDeleteTodo);

export default todoRouter;
