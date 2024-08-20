import { ITodo } from "../models/todo.interface";
import { TodoRepository } from "../repositories/todo.repository";

const todoService = {
  getAllTodos: async () => {
    try {
      const allTodos = await TodoRepository.getAllTodos();
      return allTodos;
    } catch (error) {
      console.log("todo get all service error");
    }
  },

  getOneTodo: async (todoId: string) => {
    try {
      const getOneTodo = await TodoRepository.getOneTodo(todoId);
      return getOneTodo;
    } catch (error) {
      console.log("todo get one service error");
    }
  },

  updateTodo: async (todoId: string, todoData: ITodo) => {
    try {
      const updateTodo = await TodoRepository.updateTodo(todoId, todoData);
      return updateTodo;
    } catch (error) {
      console.log("todo update service error");
    }
  },

  createTodo: async (todoData: ITodo) => {
    try {
      const { userId, todo, done } = todoData;
      if (!userId || !todo || !done) {
        throw new Error("Todo and done are required");
      }
      await TodoRepository.createTodo(todoData);
    } catch (error) {
      console.log("create todo service error");
    }
  },

  deleteTodo: async (todoId: string) => {
    try {
      const deleteTodo = await TodoRepository.deleteTodo(todoId);
      return deleteTodo;
    } catch (error) {
      console.log("delete todo service error");
    }
  },
};

export default todoService;
// import { Todo, ITodo } from "../models/todo";

// export class TodoService {
//   static async createTodo(userId: string, title: string): Promise<ITodo> {
//     const todo = new Todo({ userId, title });
//     return todo.save();
//   }

//   static async getTodosByUserId(userId: string): Promise<ITodo[]> {
//     return Todo.find({ userId });
//   }

//   static async updateTodo(todoId: string, completed: boolean): Promise<ITodo | null> {
//     return Todo.findByIdAndUpdate(todoId, { completed }, { new: true });
//   }

//   static async deleteTodo(todoId: string): Promise<ITodo | null> {
//     return Todo.findByIdAndDelete(todoId);
//   }
// }
