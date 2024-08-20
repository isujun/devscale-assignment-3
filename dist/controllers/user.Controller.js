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
const user_service_1 = __importDefault(require("../services/user.service"));
const userController = {
    handleGetAllUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const allUser = yield user_service_1.default.getAll();
        res.status(200).json({ message: "success get all users", data: allUser });
    }),
    handleGetOneUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.params.id;
            const getOneUser = yield user_service_1.default.getOne(userId);
            if (!getOneUser)
                res.status(404).json({ message: "user not found" });
            res.status(200).json({ message: "success get one user", data: getOneUser });
        }
        catch (error) {
            throw new Error("user controller error");
        }
    }),
    handleCreateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        yield user_service_1.default.register({ name, email, password });
        res.status(200).json({ message: "success create new user" });
    }),
    handleUpdateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.params.id;
            const { name, email, password } = req.body;
            yield user_service_1.default.updateUser(userId, { name, email, password });
            res.status(200).json({ message: "success update user" });
        }
        catch (error) {
            res.status(401).json({ message: "update failed" });
        }
    }),
    handleDeleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.id;
        yield user_service_1.default.deleteUser(userId);
        res.status(200).json({ message: "success delete user" });
    }),
    handleLoginUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const loginUser = yield user_service_1.default.loginUser(req.body);
            return res
                .cookie("accessToken", loginUser === null || loginUser === void 0 ? void 0 : loginUser.accessToken, {
                httpOnly: true,
            })
                .cookie("refreshToken", loginUser === null || loginUser === void 0 ? void 0 : loginUser.refreshToken, {
                httpOnly: true,
            })
                .status(200)
                .json({ status: "OK", message: "login success" });
        }
        catch (error) {
            res.status(401).json({ message: "login failed" });
            throw new Error("user controller" + error);
        }
    }),
    handleLogoutUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { refreshToken } = req.cookies;
            const logoutUser = yield user_service_1.default.logoutUser(refreshToken);
            return res.clearCookie("accessToken").clearCookie("refreshToken").status(200).json({ message: "logout success", data: logoutUser });
        }
        catch (error) {
            res.status(500).json({ message: "controller error" });
        }
    }),
};
exports.default = userController;
