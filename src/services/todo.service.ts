import { INewTodoRequest } from "../models/todo.model";
import { TodoRepository } from "../repositories/todo.repository";

export const TodoService = {
  createTodo: async (todoPayload: INewTodoRequest) => {
    try {
      const createTodo = await TodoRepository.createTodo(todoPayload);

      return createTodo;
    } catch (error) {
      console.error("service error", error);
    }
  },

  getAlltodos: async () => {
    try {
      const getAlltodos = await TodoRepository.getAllTodos();
      return getAlltodos;
    } catch (error) {
      console.error("service error ", error);
    }
  },

  getOnetodo: async (todoId: string) => {
    try {
      const getOneTodo = await TodoRepository.getOneTodo(todoId);
      return getOneTodo;
    } catch (error) {
      console.error("service error", error);
    }
  },

  updateTodo: async (todoId: string, todoPayload: INewTodoRequest) => {
    try {
      const updateTodo = await TodoRepository.updateTodo(todoId, todoPayload);
      return updateTodo;
    } catch (error) {
      console.error("service error", error);
    }
  },

  deleteTodo: async (todoId: string) => {
    try {
      const deleteTodo = await TodoRepository.deleteTodo(todoId);
      return deleteTodo;
    } catch (error) {
      console.error("service error", error);
    }
  },
};
