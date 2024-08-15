import express from "express";
import userController from "../controllers/user.Controller";

const userRouter = express.Router();

userRouter.get("/", userController.handleGetAllUser);
userRouter.get("/:id", userController.handleGetOneUser);
userRouter.post("/register", userController.handleCreateUser);
userRouter.patch("/:id", userController.handleUpdateUser);
userRouter.delete("/:id", userController.handleDeleteUser);
userRouter.post("/login", userController.handleLoginUser);
userRouter.post("/logout", userController.handleLogoutUser);

export default userRouter;
