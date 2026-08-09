import { Request, Response, NextFunction } from "express";
import { success, ZodError } from "zod";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Validation failed",
        errors: error.issues,
      });
  }
  return res.status(400).json({
    success: false,
    message: error.message,
  });
};
