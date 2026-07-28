import { Router } from "express";
import * as userController from "../controllers/user/user.controller"

const router = Router();

router.post("/register",userController.register)