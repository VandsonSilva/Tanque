import { Router } from "express";
import * as abastecimentoController from "../controller/abastecimento.controller";
import { AuthMiddleware } from "../middlewares/authe.middleware"; 

const router = Router();

// Criar abastecimento (somente usuário logado)
router.post("/", AuthMiddleware, abastecimentoController.createAbastecimento);

// Listar abastecimentos
router.get("/", AuthMiddleware, abastecimentoController.getAbastecimentos);

export default router;
