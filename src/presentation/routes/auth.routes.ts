import { Router } from "express";

import { RegisterController } from "../controllers/user/user.controller";
import { AuthController } from "../controllers/user/login.controller";
import { LogoutController } from "../controllers/user/logout.controller";

import { authMiddleware } from "../middlewares/auth.middleware";

export function createAuthRoutes(
  registerController: RegisterController,
  authController: AuthController,
  logoutController: LogoutController,
) {
  const router = Router();

  router.post(
    "/register",
    registerController.register.bind(registerController)
  );

  router.get(
    "/login",
    authController.login.bind(authController)
  );

  router.post(
    "/logout",
    authMiddleware,
    logoutController.logout.bind(logoutController)
  );

  return router;
}