import { Router } from "express";
import * as tanqueController from "../controller/tanque.controller";

const router = Router();

router.get("/", tanqueController.getTanques);
router.post("/", tanqueController.cadastrarTanque);
router.delete("/:id", tanqueController.deleteTanques);

export default router;
