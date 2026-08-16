import { NextFunction, Request, Response } from "express";
import { createUserSchema } from "../../schemas/create-user.schema";
import { CreateUserUseCase } from "../../../application/use-cases/create-user-usecase";

export class RegisterController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const validateData = createUserSchema.parse(req.body);

      const result = await this.createUserUseCase.execute(
        validateData
      );

      res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        success: true,
        message: "User created successfully",
        user: result.user,
      });
    } catch (error) {
      next(error);
    }
  };
}