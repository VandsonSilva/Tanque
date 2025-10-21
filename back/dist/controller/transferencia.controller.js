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
exports.getTransferencias = exports.createTransferencia = void 0;
const transferenciaService = __importStar(require("../services/transferencia.service"));
const createTransferencia = async (req, res) => {
    try {
        const { origemId, destinoId, quantidade, consumo } = req.body;
        const userId = req.user.id; // ✅ vem do middleware
        const transf = await transferenciaService.createTransferencia({
            origemId,
            destinoId,
            quantidade,
            userId,
            consumo, // opcional
        });
        res.json(transf);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.createTransferencia = createTransferencia;
const getTransferencias = async (req, res) => {
    try {
        const { origemId, destinoId, dataInicial, dataFinal } = req.query;
        const transfs = await transferenciaService.getTransferencias({
            origemId: origemId ? Number(origemId) : undefined,
            destinoId: destinoId ? (destinoId === "consumo" ? "consumo" : Number(destinoId)) : undefined,
            dataInicial: dataInicial,
            dataFinal: dataFinal,
        });
        res.json(transfs);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getTransferencias = getTransferencias;
