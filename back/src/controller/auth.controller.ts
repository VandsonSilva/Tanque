import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { nome, email, password, role } = req.body;

    const userRole = (req as any).user?.role;
    if (userRole && userRole !== "ADMIN") {
      return res.status(403).json({ error: "Apenas administradores podem criar usuários" });
    }

    const user = await authService.register(nome, email, password, role);
    return res.status(201).json({ message: "Usuário criado com sucesso", user });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    await authService.updatePassword(email, password)
    return res.status(201).json({ message: "Senha alterada com sucesso" })
  } catch (err: any){
    return res.status(400).json({ message: "Verifique a senha enviada" })
  }
}

export const me = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
