"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = AuthMiddleware;
exports.isAdmin = isAdmin;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "chave-secreta";
function AuthMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log("Auth Header:", authHeader); // 🔹 log do header
    if (!authHeader)
        return res.status(401).json({ error: "Token não fornecido" });
    const [, token] = authHeader.split(' ');
    console.log("Token extraído:", token); // 🔹 log do token
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        console.log("Token decodificado:", decoded); // 🔹 log do payload
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };
        next();
    }
    catch (err) {
        console.error("Erro no token:", err); // 🔹 log de erro
        return res.status(401).json({ error: "Token inválido" });
    }
}
function isAdmin(req, res, next) {
    const user = req.user;
    if (user?.role !== "ADMIN") {
        return res.status(403).json({ error: "Acesso negado. Somente administradores." });
    }
    next();
}
