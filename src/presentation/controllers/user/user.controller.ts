import { NextFunction, Request, Response } from "express";
import { makeCreateUserUserCase } from "../../../infrastructure/factories/create-user.factory";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const createUserUseCase = makeCreateUserUserCase();
    const result = await createUserUseCase.execute(req.body);
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res
      .status(201)
      .json({ sucess: true, message: "user created successfully", user:result.user });
  } catch (error: any) {
    next(error);
  }
};
