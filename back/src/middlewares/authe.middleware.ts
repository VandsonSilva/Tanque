import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "chave-secreta";

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    console.log("Auth Header:", authHeader); // 🔹 log do header

    if (!authHeader) return res.status(401).json({ error: "Token não fornecido" });

    const [, token] = authHeader.split(' ');
    console.log("Token extraído:", token); // 🔹 log do token

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string; role: string };
        console.log("Token decodificado:", decoded); // 🔹 log do payload

        (req as any).user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        }

        next();
    } catch (err) {
        console.error("Erro no token:", err); // 🔹 log de erro
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
