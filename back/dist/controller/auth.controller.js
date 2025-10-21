"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.login = exports.register = void 0;
const authService = __importStar(require("../services/auth.service"));
const register = async (req, res) => {
    try {
        const { nome, email, password, role } = req.body;
        // Somente ADMIN pode criar novos usuários
        const userRole = req.user?.role;
        if (userRole && userRole !== "ADMIN") {
            return res.status(403).json({ error: "Apenas administradores podem criar usuários" });
        }
        const user = await authService.register(nome, email, password, role);
        return res.status(201).json({ message: "Usuário criado com sucesso", user });
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await authService.login(email, password);
        return res.status(200).json(data);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
exports.login = login;
const me = async (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json({ user });
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
exports.me = me;
