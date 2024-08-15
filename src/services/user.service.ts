import { Auth } from "../entities/auth.schema";
import { User } from "../entities/user.schema";
import { ResponseError } from "../errors/response.error";
import { IUser } from "../models/user.model";
import { loginUserRequest, loginUserResponse } from "../models/user.model";
import userRepository from "../repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userService = {
  getAll: async () => {
    try {
      const allUsers = await userRepository.getUser();
      return allUsers;
    } catch (error) {
      console.log("user service error");
    }
  },

  getOne: async (userId: string) => {
    try {
      const getOneUser = await userRepository.getOneUser(userId);
      return getOneUser;
    } catch (error) {
      console.log("user service error");
    }
  },
  createUser: async (userPayload: IUser) => {
    try {
      const { name, email, password } = userPayload;

      // register valdition
      if (name.length === 0) throw new ResponseError(400, "please input your name");

      if (!email || password.length < 5) {
        throw new ResponseError(400, "email should be valid and pasword should min 6 characters");
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const createUser = await userRepository.createUser({
        name,
        email,
        password: hashPassword,
      });
      return createUser;
    } catch (error) {
      console.log("user service error");
    }
  },
  updateUser: async (userId: string, userPayLoad: IUser) => {
    try {
      const updateUser = await userRepository.updateUser(userId, userPayLoad);
      return updateUser;
    } catch (error) {
      console.log("user service error");
    }
  },
  deleteUser: async (userId: string) => {
    try {
      const delelteUser = await userRepository.deleteUser(userId);
      return delelteUser;
    } catch (error) {
      console.log("user service error");
    }
  },
  loginUser: async (userPayLoad: loginUserRequest): Promise<loginUserResponse> => {
    try {
      const { email, password } = userPayLoad;
      const user = await User.findOne({ email });

      // if user not exist
      if (!user) throw new ResponseError(400, "user not found");

      // password validation
      const isMatch = await bcrypt.compare(password, user?.password as string);

      // password invalidation
      if (!isMatch) throw new ResponseError(400, "password invalid");

      // authorization
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: 120 });
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "1d" });

      // TODO: save refresh token to database
      const newRefreshToken = new Auth({ userId: user.id, refreshToken });
      await newRefreshToken.save();

      return { accessToken, refreshToken };
    } catch (error) {
      console.log("user service error");
      throw new ResponseError(400, "login failed");
    }
  },

  logoutUser: async (refreshToken: string) => {
    // delete refresh token from database
    try {
      const deleteRefreshToken = await Auth.findOneAndDelete({ refreshToken });
      return deleteRefreshToken;
    } catch (error) {
      console.log("user service error");
    }
  },
};

export default userService;
