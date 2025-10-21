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
exports.cadastrarTanque = exports.getTanques = void 0;
const tanqueService = __importStar(require("../services/tanque.services"));
const getTanques = async (req, res) => {
    try {
        const tanques = await tanqueService.getAllTanques();
        res.json(tanques);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getTanques = getTanques;
const cadastrarTanque = async (req, res) => {
    try {
        const { nome, tipo, capacidade } = req.body;
        if (!nome || !tipo || !capacidade) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }
        const tanque = await tanqueService.createTanque({ nome, tipo, capacidade });
        res.status(201).json(tanque);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao cadastrar tanque." });
    }
};
exports.cadastrarTanque = cadastrarTanque;
