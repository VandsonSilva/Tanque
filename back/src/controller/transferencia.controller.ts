import { Request, Response } from "express";
import * as transferenciaService from "../services/transferencia.service";

export const createTransferencia = async (req: Request, res: Response) => {
  try {
    const { origemId, destinoId, quantidade, consumo } = req.body;
    const userId = (req as any).user.id; // ✅ vem do middleware

    const transf = await transferenciaService.createTransferencia({
      origemId,
      destinoId,
      quantidade,
      userId,
      consumo, // opcional
    });

    res.json(transf);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getTransferencias = async (req: Request, res: Response) => {
  try {
    const { origemId, destinoId, dataInicial, dataFinal } = req.query;

    const transfs = await transferenciaService.getTransferencias({
      origemId: origemId ? Number(origemId) : undefined,
      destinoId: destinoId ? (destinoId === "consumo" ? "consumo" : Number(destinoId)) : undefined,
      dataInicial: dataInicial as string,
      dataFinal: dataFinal as string,
    });

    res.json(transfs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
