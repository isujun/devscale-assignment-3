import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken || !refreshToken) {
    return res.status(401).json({ error: "Please authenticate." });
  }

  if (accessToken) {
    try {
      jwt.verify("accessToken", process.env.ACCESS_TOKEN_SECRET as string);
    } catch (error) {
      console.log("refresh token expired", error);
      return res.status(401).json({ error: "Please authenticate." });
    }
  }
};
