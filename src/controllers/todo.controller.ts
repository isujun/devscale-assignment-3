import { Request, Response } from "express";
import { TodoService } from "../services/todo.service";

export const TodoController = {
  handleCreateTodo: async (req: Request, res: Response) => {
    const { title, done, userId } = req.body;

    await TodoService.createTodo({ title, done, userId });
    return res.status(201).json({ message: "create todo success" });
  },

  handleGetAllTodos: async (req: Request, res: Response) => {
    const allTodos = await TodoService.getAlltodos();

    return res.status(200).json({ message: "all todos", body: allTodos });
  },

  handleGetOneTodo: async (req: Request, res: Response) => {
    const { todoId } = req.body;
    const getOneTodo = await TodoService.getOnetodo(todoId);

    return res.status(200).json({ message: "get todo", body: getOneTodo });
  },

  handleUpdateTodo: async (req: Request, res: Response) => {
    const { title, done, userId } = req.body;
    const todoId = req.params.id;

    await TodoService.updateTodo(todoId, { title, done, userId });
    return res.status(201).json({ message: "you are updating todo now" });
  },

  handleDelete: async (req: Request, res: Response) => {
    const todoId = req.body;

    await TodoService.deleteTodo(todoId);
    return res.status(200).json({ message: "delete success!" });
  },
};
