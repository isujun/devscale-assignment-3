// import { Todo, ITodo } from "../models/todo";
import { ITodo } from "../models/todo.interface";
import { Todo } from "../entities/todo.schema";

export const TodoRepository = {
  getAllTodos: async () => {
    try {
      const allTodos = await Todo.find().populate("userId").exec();
      return allTodos;
    } catch (error) {
      console.log("get all repository error");
    }
  },

  getOneTodo: async (todoId: string) => {
    try {
      const getOneTodo = await Todo.findById(todoId);
      return getOneTodo;
    } catch (error) {
      console.log("get one repository error");
    }
  },

  createTodo: async (todopayload: ITodo) => {
    try {
      const createTodo = new Todo(todopayload);
      await createTodo.save();
    } catch (error) {
      console.log(" create repository error");
    }
  },

  updateTodo: async (todoId: string, todoData: ITodo) => {
    try {
      const updateTodo = await Todo.findByIdAndUpdate(todoId, todoData);
      return updateTodo;
    } catch (error) {
      console.log(" update repository error");
    }
  },

  deleteTodo: async (todoId: string) => {
    try {
      const deleteTodo = await Todo.findByIdAndDelete(todoId);
      return deleteTodo;
    } catch (error) {
      console.log("delete repository error");
    }
  },
};
// export class TodoRepository implements BaseRepository<ITodo> {
//   async create(todo: ITodo): Promise<ITodo> {
//     return Todo.create(todo);
//   }

//   async findById(id: string): Promise<ITodo | null> {
//     return Todo.findById(id);
//   }

//   async findAll(): Promise<ITodo[]> {
//     return Todo.find();
//   }

//   async update(id: string, todoData: Partial<ITodo>): Promise<ITodo | null> {
//     return Todo.findByIdAndUpdate(id, todoData, { new: true });
//   }

//   async delete(id: string): Promise<ITodo | null> {
//     return Todo.findByIdAndDelete(id);
//   }

//   async findByUserId(userId: string): Promise<ITodo[]> {
//     return Todo.find({ userId });
//   }
// }
