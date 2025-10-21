"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTanque = exports.getTanqueById = exports.getAllTanques = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const getAllTanques = async () => {
    return await client_1.default.tanque.findMany();
};
exports.getAllTanques = getAllTanques;
const getTanqueById = async (id) => {
    return await client_1.default.tanque.findUnique({ where: { id } });
};
exports.getTanqueById = getTanqueById;
const createTanque = async (data) => {
    // Cria um tanque no banco
    return await client_1.default.tanque.create({
        data: {
            nome: data.nome,
            tipo: data.tipo,
            capacidade: data.capacidade,
            volumeAtual: 0, // volume inicial sempre zero
        },
    });
};
exports.createTanque = createTanque;
