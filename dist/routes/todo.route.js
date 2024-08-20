"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_controller_1 = require("../controllers/todo.controller");
const authenticate_1 = require("../middleware/authenticate");
const todoRouter = express_1.default.Router();
todoRouter.use(authenticate_1.authMiddleware);
todoRouter.get("/", todo_controller_1.TodoController.handleGetAllTodos);
todoRouter.get("/:id", todo_controller_1.TodoController.handleGetOneTodo);
todoRouter.post("/", todo_controller_1.TodoController.handleCreateTodo);
todoRouter.patch("/:id", todo_controller_1.TodoController.handleUpdateTodo);
todoRouter.delete("/:id", todo_controller_1.TodoController.handleDeleteTodo);
exports.default = todoRouter;
