import { Request, Response } from "express";
import * as tanqueService from "../services/tanque.services";

export const getTanques = async (req: Request, res: Response) => {
  try {
    const tanques = await tanqueService.getAllTanques();
    res.json(tanques);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTanques = async(req: Request, res: Response) => {
  try {
    const IdTanque = Number(req.params.id);
    if (isNaN(IdTanque)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    await tanqueService.deleteTanques(IdTanque);
    return res.status(200).json({ message: "Tanque deletado com sucesso!" });

  } catch (err: any) {
    if (err.code === 'P2025') {
      // Prisma error: record to delete does not exist
      return res.status(404).json({ message: "Tanque não encontrado." });
    }
    res.status(500).json({ message: "Não foi possível excluir o tanque, verifique os parâmetros" });
  }
}


export const cadastrarTanque = async (req: Request, res: Response) => {
  try {
    const { nome, tipo, capacidade } = req.body;

    if (!nome || !tipo || !capacidade) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const tanque = await tanqueService.createTanque({ nome, tipo, capacidade });
    res.status(201).json(tanque);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Erro ao cadastrar tanque." });
  }
};