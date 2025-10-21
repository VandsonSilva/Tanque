import { Router } from "express";
import * as authController from "../controller/auth.controller";
import { AuthMiddleware } from "../middlewares/authe.middleware";

const router = Router();

router.post("/login", authController.login);
router.post("/register", authController.register); 
router.get("/me", AuthMiddleware, authController.me);

export default router;
