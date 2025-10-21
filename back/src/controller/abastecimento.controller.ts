import { Request, Response } from "express";
import * as abastecimentoService from "../services/abastecimento.service";

export const createAbastecimento = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // usuário logado (assumindo JWT middleware)
    const { tanqueId, quantidade, data, notaFiscal } = req.body;
     

    if (!tanqueId || !quantidade || quantidade <= 0) {
      return res.status(400).json({ error: "Tanque e quantidade são obrigatórios" });
      
    }

    const abastecimento = await abastecimentoService.createAbastecimento({
      tanqueId: Number(tanqueId),
      quantidade: Number(quantidade),
      data,
      notaFiscal,
      userId,
    });

    return res.json({ message: "Abastecimento registrado com sucesso", abastecimento });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Erro ao registrar abastecimento" });
  }
};

export const getAbastecimentos = async (_req: Request, res: Response) => {
  try {
    const abastecimentos = await abastecimentoService.listAbastecimentos();
    return res.json(abastecimentos);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao listar abastecimentos" });
  }
};
