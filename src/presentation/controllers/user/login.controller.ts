import { NextFunction, Request, Response } from "express";
import { loginSchema } from "../../schemas/login.schema";
import {loginUserUseCase} from "../../../infrastructure/container/container"

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const validateData = loginSchema.parse(req.body)

    const result = await loginUserUseCase.execute(validateData);

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
