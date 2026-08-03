import { NextFunction, Request, Response } from "express";
import { makeLoginUserUseCase } from "../../../infrastructure/factories/login-user.factory";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loginUserUseCase = makeLoginUserUseCase();

    const result = await loginUserUseCase.execute(req.body);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, 
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
};