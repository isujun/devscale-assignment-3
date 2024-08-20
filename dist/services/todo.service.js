"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_repository_1 = require("../repositories/todo.repository");
const todoService = {
    getAllTodos: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allTodos = yield todo_repository_1.TodoRepository.getAllTodos();
            return allTodos;
        }
        catch (error) {
            console.log("todo get all service error");
        }
    }),
    getOneTodo: (todoId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getOneTodo = yield todo_repository_1.TodoRepository.getOneTodo(todoId);
            return getOneTodo;
        }
        catch (error) {
            console.log("todo get one service error");
        }
    }),
    updateTodo: (todoId, todoData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updateTodo = yield todo_repository_1.TodoRepository.updateTodo(todoId, todoData);
            return updateTodo;
        }
        catch (error) {
            console.log("todo update service error");
        }
    }),
    createTodo: (todoData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, todo, done } = todoData;
            if (!userId || !todo || !done) {
                throw new Error("Todo and done are required");
            }
            yield todo_repository_1.TodoRepository.createTodo(todoData);
        }
        catch (error) {
            console.log("create todo service error");
        }
    }),
    deleteTodo: (todoId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleteTodo = yield todo_repository_1.TodoRepository.deleteTodo(todoId);
            return deleteTodo;
        }
        catch (error) {
            console.log("delete todo service error");
        }
    }),
};
exports.default = todoService;
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
