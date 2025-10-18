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