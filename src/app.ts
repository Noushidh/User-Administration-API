import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { errorHandler } from "./presentation/middlewares/error.middleware";
import { createAuthRoutes } from "./presentation/routes/auth.routes";

import { createContainer } from "./infrastructure/container/container";

export function createApp(
  container: ReturnType<typeof createContainer>
) {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cookieParser());

  app.use(
    "/api/auth",
    createAuthRoutes(
      container.registerController,
      container.authController,
      container.logoutController,
    )
  );

  app.use(errorHandler);

  return app; 
}