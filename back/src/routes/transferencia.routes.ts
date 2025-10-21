import { Router } from "express";
import * as transferenciaController from "../controller/transferencia.controller";
import { AuthMiddleware } from "../middlewares/authe.middleware";

const router = Router();

router.get("/", AuthMiddleware, transferenciaController.getTransferencias);
router.post("/", AuthMiddleware, transferenciaController.createTransferencia);


export default router;
