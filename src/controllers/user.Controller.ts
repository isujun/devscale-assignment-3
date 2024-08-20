import { Request, Response } from "express";
import userService from "../services/user.service";

const userController = {
  handleGetAllUser: async (req: Request, res: Response) => {
    const allUser = await userService.getAll();

    res.status(200).json({ message: "success get all users", data: allUser });
  },
  handleGetOneUser: async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const getOneUser = await userService.getOne(userId);

      if (!getOneUser) res.status(404).json({ message: "user not found" });

      res.status(200).json({ message: "success get one user", data: getOneUser });
    } catch (error) {
      throw new Error("user controller error");
    }
  },
  handleCreateUser: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    await userService.register({ name, email, password });

    res.status(200).json({ message: "success create new user" });
  },
  handleUpdateUser: async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const { name, email, password } = req.body;
      await userService.updateUser(userId, { name, email, password });

      res.status(200).json({ message: "success update user" });
    } catch (error) {
      res.status(401).json({ message: "update failed" });
    }
  },
  handleDeleteUser: async (req: Request, res: Response) => {
    const userId = req.params.id;

    await userService.deleteUser(userId);

    res.status(200).json({ message: "success delete user" });
  },

  handleLoginUser: async (req: Request, res: Response) => {
    try {
      const loginUser = await userService.loginUser(req.body);
      return res
        .cookie("accessToken", loginUser?.accessToken, {
          httpOnly: true,
        })
        .cookie("refreshToken", loginUser?.refreshToken, {
          httpOnly: true,
        })
        .status(200)
        .json({ status: "OK", message: "login success" });
    } catch (error) {
      res.status(401).json({ message: "login failed" });
      throw new Error("user controller" + error);
    }
  },

  handleLogoutUser: async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.cookies;
      const logoutUser = await userService.logoutUser(refreshToken);
      return res.clearCookie("accessToken").clearCookie("refreshToken").status(200).json({ message: "logout success", data: logoutUser });
    } catch (error) {
      res.status(500).json({ message: "controller error" });
    }
  },
};

export default userController;
