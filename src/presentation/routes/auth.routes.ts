import { Router } from "express";
import {register} from "../controllers/user/user.controller"
import {login} from "../controllers/user/login.controller"
import { logout } from "../controllers/user/logout.controller";

const router = Router();

router.post("/register",register)
router.get("/login",login)
router.post("/logout",logout)

export default router