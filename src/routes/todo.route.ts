import express from "express";
import { TodoController } from "../controllers/todo.controller";

const todoRouter = express.Router();

todoRouter.get("/", TodoController.handleGetAllTodos);
todoRouter.get("/:id", TodoController.handleGetOneTodo);
todoRouter.post("/", TodoController.handleCreateTodo);
todoRouter.patch("/:id", TodoController.handleUpdateTodo);
todoRouter.delete("/:id", TodoController.handleDeleteTodo);

export default todoRouter;
