import { NextFunction, Request, Response } from "express";

export class LogoutController {
  logout = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    console.log("user",req.user)
    try {

      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.status(200).json({
        success: true,
        message: "Logout successful",
      });
    } catch (error) {
      next(error);
    }
  };
}