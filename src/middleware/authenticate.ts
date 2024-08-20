import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Auth } from "../entities/auth.schema";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken || !refreshToken) {
    return res.status(401).json({ error: "Please authenticate." });
  }
  // check toke if exist
  if (accessToken) {
    try {
      await jwt.verify("accessToken", process.env.JWT_ACCESS_TOKEN as string);
    } catch (error) {
      // if false, regenerate new access token from refresh token
      if (!refreshToken) {
        return res.status(401).json({ error: "unauthorized" });
      }

      try {
        // check if refresh token is valid
        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN as string);

        // if valid, verify if it's exist in database
        const activeRefreshToken = await Auth.findOne({ refreshToken });

        if (!activeRefreshToken) {
          console.log("refresh token not found in db");
          return res.json({ message: "please re-login" });
        }

        const payload = jwt.decode(refreshToken) as {
          id: string;
          name: string;
          email: string;
        };
        console.log(payload);
        const newAccessToken = jwt.sign(
          {
            id: payload.id,
            name: payload.name,
            email: payload.email,
          },
          process.env.JWT_ACCESS_TOKEN as string,
          { expiresIn: 300 }
        );

        return res.cookie("accessToken", newAccessToken, { httpOnly: true }).json({ data: "getting data.." });
        // regenerate new access token
      } catch (error) {
        // if invalid, user need to re-login
        return res.status(401).json({ message: "please Re-login.." });
      }
    }
  }
  next();
}
