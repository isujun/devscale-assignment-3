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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const todo_service_1 = __importDefault(require("../services/todo.service"));
exports.TodoController = {
    handleGetAllTodos: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const allTodos = yield todo_service_1.default.getAllTodos();
        return res.status(200).json({ message: "get all todos", body: allTodos });
    }),
    handleGetOneTodo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const todoId = req.params.id;
        const getOneTodo = yield todo_service_1.default.getOneTodo(todoId);
        if (!getOneTodo)
            return res.status(404).json({ message: "Todo not found" });
        return res.status(200).json({ message: "get todo", body: getOneTodo });
    }),
    handleCreateTodo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, todo, done } = req.body;
            yield todo_service_1.default.createTodo({ userId, todo, done });
            return res.status(201).json({ message: "create todo success", data: { todo, done } });
        }
        catch (error) {
            return res.status(401).json({ message: error });
        }
    }),
    handleUpdateTodo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const todoId = req.params.id;
            const todo = yield todo_service_1.default.updateTodo(todoId, req.body);
            if (!todo)
                return res.status(404).json({ message: "Todo not found" });
            res.json(todo);
        }
        catch (error) {
            return res.status(400).json({ message: error });
        }
    }),
    handleDeleteTodo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const todoId = req.params.id;
            yield todo_service_1.default.deleteTodo(todoId);
            return res.status(200).json({ message: "delete success!" });
        }
        catch (error) {
            console.log(error);
        }
    }),
};
