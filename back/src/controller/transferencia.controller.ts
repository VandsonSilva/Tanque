import { Request, Response } from "express";
import * as transferenciaService from "../services/transferencia.service";

export const createTransferencia = async (req: Request, res: Response) => {
  try {
    const { origemId, destinoId, quantidade } = req.body;
    const transf = await transferenciaService.createTransferencia({ origemId, destinoId, quantidade });
    res.json(transf);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getTransferencias = async (req: Request, res: Response) => {
  try {
    const transfs = await transferenciaService.getAllTransferencias();
    res.json(transfs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
