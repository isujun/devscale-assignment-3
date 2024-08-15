import { Request, Response } from "express";
import userService from "../services/user.service";

const userController = {
  handleGetAllUser: async (req: Request, res: Response) => {
    const allUser = await userService.getAll();

    res.status(200).json({ message: "success get all users", data: allUser });
  },
  handleGetOneUser: async (req: Request, res: Response) => {
    const userId = req.params.id;
    const getOneUser = await userService.getOne(userId);
    res.status(200).json({ message: "success get one user", data: getOneUser });
  },
  handleCreateUser: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    await userService.createUser({ name, email, password });

    res.status(200).json({ message: "success create new user" });
  },
  handleUpdateUser: async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { name, email, password } = req.body;
    await userService.updateUser(userId, { name, email, password });

    res.status(200).json({ message: "success update user" });
  },
  handleDeleteUser: async (req: Request, res: Response) => {
    const userId = req.params.id;

    await userService.deleteUser(userId);

    res.status(200).json({ message: "success delete user" });
  },

  handleLoginUser: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const loginUser = await userService.loginUser({ email, password });
    const { accessToken, refreshToken } = loginUser;
    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: "login success" });
  },

  handleLogoutUser: async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const logoutUser = await userService.logoutUser(refreshToken);
    return res.clearCookie("accessToken").clearCookie("refreshToken").status(200).json({ message: "logout success", data: logoutUser });
  },
};

export default userController;
