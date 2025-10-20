import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "secreto";

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json({ error: "Token não fornecido" });

    const [, token] = authHeader.split(' ');

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string; role: string };
        (req as any) = decoded;
        next();

    } catch {
        return res.status(401).json({ error: "Token inválido" }); 
    }
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
    const user = (req as any).user;
    if (user?.role !== "ADMIN") {
    return res.status(403).json({ error: "Acesso negado. Somente administradores." });
  }
  next();
}
