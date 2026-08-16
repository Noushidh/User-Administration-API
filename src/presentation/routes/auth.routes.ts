import { Router } from "express";
import { authController , registerController ,logoutController} from "../../infrastructure/container/container";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", registerController.register);
router.get("/login", authController.login);
router.post("/logout", authMiddleware,logoutController.logout);

export default router;
