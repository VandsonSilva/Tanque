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
exports.getAbastecimentos = exports.createAbastecimento = void 0;
const abastecimentoService = __importStar(require("../services/abastecimento.service"));
const createAbastecimento = async (req, res) => {
    try {
        const userId = req.user.id; // usuário logado (assumindo JWT middleware)
        const { tanqueId, quantidade, data, notaFiscal } = req.body;
        if (!tanqueId || !quantidade || quantidade <= 0) {
            return res.status(400).json({ error: "Tanque e quantidade são obrigatórios" });
        }
        const abastecimento = await abastecimentoService.createAbastecimento({
            tanqueId: Number(tanqueId),
            quantidade: Number(quantidade),
            data,
            notaFiscal,
            userId,
        });
        return res.json({ message: "Abastecimento registrado com sucesso", abastecimento });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message || "Erro ao registrar abastecimento" });
    }
};
exports.createAbastecimento = createAbastecimento;
const getAbastecimentos = async (_req, res) => {
    try {
        const abastecimentos = await abastecimentoService.listAbastecimentos();
        return res.json(abastecimentos);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao listar abastecimentos" });
    }
};
exports.getAbastecimentos = getAbastecimentos;
