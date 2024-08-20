import { Auth } from "../entities/auth.schema";
// import { User } from "../entities/user.schema";
import { ResponseError } from "../errors/response.error";
// import { IUser } from "../models/user.model";
import { IUser, Ilogin } from "../models/user.interface";
import userRepository from "../repositories/user.repository";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// class UserService {
//   private static generateTokens(payload: object): { accessToken: string; refreshToken: string } {
//     const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "2m" });
//     const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "1d" });
//     return { accessToken, refreshToken };
//   }
// }

const userService = {
  getAll: async () => {
    try {
      const allUsers = await userRepository.getAllUser();
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
  register: async (userPayload: IUser) => {
    try {
      const { name, email, password } = userPayload;

      // register valdition
      if (name.length === 0) throw new ResponseError(400, "please input your name");

      if (!email || password.length < 5) {
        throw new ResponseError(400, "email should be valid and pasword should min 6 characters");
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const createUser = await userRepository.registerUser({
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
  loginUser: async (userData: Ilogin) => {
    try {
      const { email, password } = userData;
      const login = await userRepository.loginUser(userData);

      return login;
    } catch (error) {
      console.log("login service error");
      throw new ResponseError(400, "user not found");
    }
    // try {
    //   const { email, password } = userData;

    //   // find user
    //   const user = await userRepository.loginUser(userData);
    //   // if user not exist
    //   if (!user) throw new ResponseError(400, "user not found");

    //   // password validation
    //   const isPasswordMatch = await bcrypt.compare(password, user?.password as string);

    //   // password invalidation
    //   if (!isPasswordMatch) throw new ResponseError(400, "password invalid");

    //   // authorization
    //   const payload = {
    //     id: user.id,
    //     name: user.name,
    //     email: user.email,
    //   };

    //   const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: 200 });
    //   const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "1d" });

    //   // TODO: save refresh token to database
    //   const newRefreshToken = new Auth({ userId: user.id, refreshToken });
    //   await newRefreshToken.save();

    //   return { accessToken, refreshToken };
    // } catch (error) {
    //   console.log("login user service error");
    //   throw new ResponseError(400, "login failed");
    // }
  },

  logoutUser: async (refreshToken: string) => {
    // delete refresh token from database
    try {
      const deleteRefreshToken = await userRepository.logoutUser(refreshToken);
      return deleteRefreshToken;
    } catch (error) {
      console.log("user service error");
    }
  },
};

export default userService;
