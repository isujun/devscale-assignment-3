"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_Controller_1 = __importDefault(require("../controllers/user.Controller"));
const userRouter = express_1.default.Router();
userRouter.get("/", user_Controller_1.default.handleGetAllUser);
userRouter.get("/:id", user_Controller_1.default.handleGetOneUser);
userRouter.post("/register", user_Controller_1.default.handleCreateUser);
userRouter.patch("/:id", user_Controller_1.default.handleUpdateUser);
userRouter.delete("/:id", user_Controller_1.default.handleDeleteUser);
userRouter.post("/login", user_Controller_1.default.handleLoginUser);
userRouter.post("/logout", user_Controller_1.default.handleLogoutUser);
exports.default = userRouter;
