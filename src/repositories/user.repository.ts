import { User } from "../entities/user.schema";
import { Auth } from "../entities/auth.schema";
import { IUser, Ilogin } from "../models/user.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRepository = {
  getAllUser: async () => {
    try {
      const allUser = await User.find();
      return allUser;
    } catch (error) {
      console.log(error);
      console.log("cannot get from user datababe");
    }
  },

  getOneUser: async (userId: string) => {
    try {
      const getOneUser = await User.findById(userId);
      return getOneUser;
    } catch (error) {
      console.log(error);
    }
  },

  registerUser: async (userPayload: IUser) => {
    try {
      const createUser = new User(userPayload);
      await createUser.save();
    } catch (error) {
      console.log(error);
    }
  },
  updateUser: async (userId: string, userPayload: IUser) => {
    try {
      const updateUser = await User.findByIdAndUpdate(userId, userPayload);
      return updateUser;
    } catch (error) {
      console.log(error);
    }
  },
  deleteUser: async (userId: string) => {
    try {
      const deleteUser = await User.findByIdAndDelete(userId);
      return deleteUser;
    } catch (error) {
      console.log(error);
    }
  },

  loginUser: async (userData: Ilogin) => {
    try {
      const { email, password } = userData;

      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password as string);
      if (!isPasswordMatch) {
        throw new Error("Invalid password");
      }

      // authorization
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
      };

      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN as string, { expiresIn: 200 });
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN as string, { expiresIn: "1d" });

      const newRefreshToken = new Auth({ userId: user._id, refreshToken });

      await newRefreshToken.save();
      return { accessToken, refreshToken };
    } catch (error) {
      console.log(error);
      throw new Error("Login failed");
    }
    //   const { email, password } = userData;
    //   const loginUser = await User.findOne({ email });
    //   return loginUser;
    // } catch (error) {
    //   console.log(error);
  },

  logoutUser: async (refreshToken: string) => {
    try {
      const deleteRefreshToken = await Auth.findOneAndDelete({ refreshToken });
      return deleteRefreshToken;
    } catch (error) {
      throw new Error("Logout failed");
    }
  },
};

export default userRepository;
