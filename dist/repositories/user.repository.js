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
const user_schema_1 = require("../entities/user.schema");
const auth_schema_1 = require("../entities/auth.schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository = {
    getAllUser: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allUser = yield user_schema_1.User.find();
            return allUser;
        }
        catch (error) {
            console.log(error);
            console.log("cannot get from user datababe");
        }
    }),
    getOneUser: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getOneUser = yield user_schema_1.User.findById(userId);
            return getOneUser;
        }
        catch (error) {
            console.log(error);
        }
    }),
    registerUser: (userPayload) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const createUser = new user_schema_1.User(userPayload);
            yield createUser.save();
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateUser: (userId, userPayload) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updateUser = yield user_schema_1.User.findByIdAndUpdate(userId, userPayload);
            return updateUser;
        }
        catch (error) {
            console.log(error);
        }
    }),
    deleteUser: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleteUser = yield user_schema_1.User.findByIdAndDelete(userId);
            return deleteUser;
        }
        catch (error) {
            console.log(error);
        }
    }),
    loginUser: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = userData;
            const user = yield user_schema_1.User.findOne({ email });
            if (!user) {
                throw new Error("User not found");
            }
            const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordMatch) {
                throw new Error("Invalid password");
            }
            // authorization
            const payload = {
                id: user._id,
                name: user.name,
                email: user.email,
            };
            const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: 200 });
            const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: "1d" });
            const newRefreshToken = new auth_schema_1.Auth({ userId: user._id, refreshToken });
            yield newRefreshToken.save();
            return { accessToken, refreshToken };
        }
        catch (error) {
            console.log(error);
            throw new Error("Login failed");
        }
        //   const { email, password } = userData;
        //   const loginUser = await User.findOne({ email });
        //   return loginUser;
        // } catch (error) {
        //   console.log(error);
    }),
    logoutUser: (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleteRefreshToken = yield auth_schema_1.Auth.findOneAndDelete({ refreshToken });
            return deleteRefreshToken;
        }
        catch (error) {
            throw new Error("Logout failed");
        }
    }),
};
exports.default = userRepository;
