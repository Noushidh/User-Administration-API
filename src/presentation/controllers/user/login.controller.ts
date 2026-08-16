import { NextFunction, Request, Response } from "express";
import { loginSchema } from "../../schemas/login.schema";
import { LoginUserUseCase } from "../../../application/use-cases/login-user-usecase";

export class AuthController {
  constructor(private readonly loginUserUseCase: LoginUserUseCase) {}

  login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const validateData = loginSchema.parse(req.body);

      const result = await this.loginUserUseCase.execute(validateData);

      res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        message: "Login successful",
        user: result.user,
      });
    } catch (error) {
      next(error);
    }
  };
}
