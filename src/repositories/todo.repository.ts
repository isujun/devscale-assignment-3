import { Todo } from "../entities/todo.schema";
import { INewTodoRequest } from "../models/todo.model";

export const TodoRepository = {
  createTodo: async (todoPayload: INewTodoRequest) => {
    try {
      const createTodo = new Todo(todoPayload);

      await createTodo.save();
    } catch (error) {
      console.error("repository is error", error);
    }
  },

  getAllTodos: async () => {
    try {
      const allTodos = await Todo.find();
      return allTodos;
    } catch (error) {
      console.error("repository is error", error);
    }
  },

  getOneTodo: async (todoId: string) => {
    try {
      const getTodo = await Todo.findById(todoId);
      return getTodo;
    } catch (error) {
      console.error("repository error", error);
    }
  },

  updateTodo: async (todoId: string, todoPayload: INewTodoRequest) => {
    try {
      const updateTodo = await Todo.findByIdAndUpdate(todoId, todoPayload);
      return updateTodo;
    } catch (error) {
      console.error("repository error", error);
    }
  },

  deleteTodo: async (todoId: string) => {
    try {
      const deleteTodo = await Todo.findByIdAndDelete(todoId);
      return deleteTodo;
    } catch (error) {
      console.error("repository is error", error);
    }
  },
};
