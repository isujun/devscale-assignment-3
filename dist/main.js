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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const todo_route_1 = __importDefault(require("./routes/todo.route"));
const database_1 = require("./config/database");
dotenv_1.default.config();
const PORT = process.env.PORT || 8000;
// mongoose
//   .connect(process.env.MONGO_URI as string)
//   .then(() => console.log("mongodb connection success"))
//   .catch(() => console.log("mongodb connection failed"));
const app = (0, express_1.default)();
(0, database_1.connectDB)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("api/v1/users", user_route_1.default);
app.use("api/v1/todos", todo_route_1.default);
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`App is listening on http://localhost:${PORT}`);
}));
