import { Request, Response } from "express";
import todoService from "../services/todo.service";

export const TodoController = {
  handleGetAllTodos: async (req: Request, res: Response) => {
    const allTodos = await todoService.getAllTodos();

    return res.status(200).json({ message: "get all todos", body: allTodos });
  },

  handleGetOneTodo: async (req: Request, res: Response) => {
    const todoId = req.params.id;
    const getOneTodo = await todoService.getOneTodo(todoId);

    if (!getOneTodo) return res.status(404).json({ message: "Todo not found" });

    return res.status(200).json({ message: "get todo", body: getOneTodo });
  },

  handleCreateTodo: async (req: Request, res: Response) => {
    try {
      const { userId, todo, done } = req.body;

      await todoService.createTodo({ userId, todo, done });
      return res.status(201).json({ message: "create todo success", data: { todo, done } });
    } catch (error) {
      return res.status(401).json({ message: error });
    }
  },

  handleUpdateTodo: async (req: Request, res: Response) => {
    try {
      const todoId = req.params.id;

      const todo = await todoService.updateTodo(todoId, req.body);
      if (!todo) return res.status(404).json({ message: "Todo not found" });
      res.json(todo);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },

  handleDeleteTodo: async (req: Request, res: Response) => {
    try {
      const todoId = req.params.id;

      await todoService.deleteTodo(todoId);
      return res.status(200).json({ message: "delete success!" });
    } catch (error) {
      console.log(error);
    }
  },
};
