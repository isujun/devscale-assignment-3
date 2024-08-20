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
exports.TodoRepository = void 0;
const todo_schema_1 = require("../entities/todo.schema");
exports.TodoRepository = {
    getAllTodos: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allTodos = yield todo_schema_1.Todo.find().populate("userId").exec();
            return allTodos;
        }
        catch (error) {
            console.log("get all repository error");
        }
    }),
    getOneTodo: (todoId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getOneTodo = yield todo_schema_1.Todo.findById(todoId);
            return getOneTodo;
        }
        catch (error) {
            console.log("get one repository error");
        }
    }),
    createTodo: (todopayload) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const createTodo = new todo_schema_1.Todo(todopayload);
            yield createTodo.save();
        }
        catch (error) {
            console.log(" create repository error");
        }
    }),
    updateTodo: (todoId, todoData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updateTodo = yield todo_schema_1.Todo.findByIdAndUpdate(todoId, todoData);
            return updateTodo;
        }
        catch (error) {
            console.log(" update repository error");
        }
    }),
    deleteTodo: (todoId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleteTodo = yield todo_schema_1.Todo.findByIdAndDelete(todoId);
            return deleteTodo;
        }
        catch (error) {
            console.log("delete repository error");
        }
    }),
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
