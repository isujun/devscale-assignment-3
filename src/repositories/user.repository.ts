import { User } from "../entities/user.schema";
import { Auth } from "../entities/auth.schema";
import { IUser } from "../models/user.model";
import { loginUserRequest } from "../models/user.model";

const userRepository = {
  getUser: async () => {
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

  createUser: async (userPayload: IUser) => {
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

  loginUser: async (userPayload: loginUserRequest) => {
    try {
      const { email, password } = userPayload;
      const loginUser = await User.findOne({ email });
      return loginUser;
    } catch (error) {
      console.log(error);
    }
  },

  logoutUser: async (refreshToken: string) => {
    try {
      const logoutUser = await Auth.findOneAndDelete({ refreshToken });
      return logoutUser;
    } catch (error) {
      console.log(error);
    }
  },
};

export default userRepository;
