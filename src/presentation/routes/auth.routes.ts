import { Router } from "express";
import * as userController from "../controllers/user/user.controller"
import * as loginController from "../controllers/user/login.controller"

const router = Router();

router.post("/register",userController.register)
router.get("/login",loginController.login)

export default router