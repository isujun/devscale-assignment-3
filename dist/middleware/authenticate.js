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
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_schema_1 = require("../entities/auth.schema");
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { accessToken, refreshToken } = req.cookies;
        if (!accessToken || !refreshToken) {
            return res.status(401).json({ error: "Please authenticate." });
        }
        // check toke if exist
        if (accessToken) {
            try {
                yield jsonwebtoken_1.default.verify("accessToken", process.env.JWT_ACCESS_TOKEN);
            }
            catch (error) {
                // if false, regenerate new access token from refresh token
                if (!refreshToken) {
                    return res.status(401).json({ error: "unauthorized" });
                }
                try {
                    // check if refresh token is valid
                    jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
                    // if valid, verify if it's exist in database
                    const activeRefreshToken = yield auth_schema_1.Auth.findOne({ refreshToken });
                    if (!activeRefreshToken) {
                        console.log("refresh token not found in db");
                        return res.json({ message: "please re-login" });
                    }
                    const payload = jsonwebtoken_1.default.decode(refreshToken);
                    console.log(payload);
                    const newAccessToken = jsonwebtoken_1.default.sign({
                        id: payload.id,
                        name: payload.name,
                        email: payload.email,
                    }, process.env.JWT_ACCESS_TOKEN, { expiresIn: 300 });
                    return res.cookie("accessToken", newAccessToken, { httpOnly: true }).json({ data: "getting data.." });
                    // regenerate new access token
                }
                catch (error) {
                    // if invalid, user need to re-login
                    return res.status(401).json({ message: "please Re-login.." });
                }
            }
        }
        next();
    });
}
