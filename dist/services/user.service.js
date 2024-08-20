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
// import { User } from "../entities/user.schema";
const response_error_1 = require("../errors/response.error");
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// import jwt from "jsonwebtoken";
// class UserService {
//   private static generateTokens(payload: object): { accessToken: string; refreshToken: string } {
//     const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "2m" });
//     const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "1d" });
//     return { accessToken, refreshToken };
//   }
// }
const userService = {
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allUsers = yield user_repository_1.default.getAllUser();
            return allUsers;
        }
        catch (error) {
            console.log("user service error");
        }
    }),
    getOne: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getOneUser = yield user_repository_1.default.getOneUser(userId);
            return getOneUser;
        }
        catch (error) {
            console.log("user service error");
        }
    }),
    register: (userPayload) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password } = userPayload;
            // register valdition
            if (name.length === 0)
                throw new response_error_1.ResponseError(400, "please input your name");
            if (!email || password.length < 5) {
                throw new response_error_1.ResponseError(400, "email should be valid and pasword should min 6 characters");
            }
            const hashPassword = yield bcrypt_1.default.hash(password, 10);
            const createUser = yield user_repository_1.default.registerUser({
                name,
                email,
                password: hashPassword,
            });
            return createUser;
        }
        catch (error) {
            console.log("user service error");
        }
    }),
    updateUser: (userId, userPayLoad) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updateUser = yield user_repository_1.default.updateUser(userId, userPayLoad);
            return updateUser;
        }
        catch (error) {
            console.log("user service error");
        }
    }),
    deleteUser: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const delelteUser = yield user_repository_1.default.deleteUser(userId);
            return delelteUser;
        }
        catch (error) {
            console.log("user service error");
        }
    }),
    loginUser: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = userData;
            const login = yield user_repository_1.default.loginUser(userData);
            return login;
        }
        catch (error) {
            console.log("login service error");
            throw new response_error_1.ResponseError(400, "user not found");
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
    }),
    logoutUser: (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        // delete refresh token from database
        try {
            const deleteRefreshToken = yield user_repository_1.default.logoutUser(refreshToken);
            return deleteRefreshToken;
        }
        catch (error) {
            console.log("user service error");
        }
    }),
};
exports.default = userService;
