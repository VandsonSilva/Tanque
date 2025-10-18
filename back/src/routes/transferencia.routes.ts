import { Router } from "express";
import * as transferenciaController from "../controller/transferencia.controller";

const router = Router();

router.get("/", transferenciaController.getTransferencias);
router.post("/", transferenciaController.createTransferencia);

export default router;
