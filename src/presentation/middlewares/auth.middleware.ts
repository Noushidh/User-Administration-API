import { Request, Response, NextFunction } from "express";
import { JwtService } from "../../infrastructure/services/JwtService";

export const authMiddleware = (
  jwtService: JwtService
) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const payload = jwtService.verifyToken(token);

    req.user = {
      id: payload.id,
      name: payload.name,
      email: payload.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};