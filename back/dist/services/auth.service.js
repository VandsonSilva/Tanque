"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "chave-secreta";
const register = async (nome, email, password, role = "USER") => {
    const existing = await client_1.default.user.findUnique({ where: { email } });
    if (existing)
        throw new Error("Email já cadastrado");
    const hashed = await bcrypt_1.default.hash(password, 10);
    const user = await client_1.default.user.create({
        data: { nome, email, password: hashed, role: role },
    });
    return { id: user.id, nome: user.nome, email: user.email, role: user.role };
};
exports.register = register;
const login = async (email, password) => {
    const user = await client_1.default.user.findUnique({ where: { email } });
    if (!user)
        throw new Error("Usuário não encontrado");
    const valid = await bcrypt_1.default.compare(password, user.password);
    if (!valid)
        throw new Error("Senha incorreta");
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "8h" });
    return {
        token,
        user: { id: user.id, nome: user.nome, email: user.email, role: user.role },
    };
};
exports.login = login;
