"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransferencias = exports.createTransferencia = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const createTransferencia = async (data) => {
    const origem = await client_1.default.tanque.findUnique({ where: { id: data.origemId } });
    const destino = await client_1.default.tanque.findUnique({ where: { id: data.destinoId } });
    if (!origem || !destino)
        throw new Error("Tanque não encontrado");
    if (data.quantidade > origem.volumeAtual)
        throw new Error("Volume insuficiente no tanque de origem");
    // Atualiza os volumes
    await client_1.default.tanque.update({
        where: { id: origem.id },
        data: { volumeAtual: origem.volumeAtual - data.quantidade },
    });
    await client_1.default.tanque.update({
        where: { id: destino.id },
        data: { volumeAtual: destino.volumeAtual + data.quantidade },
    });
    // Cria a transferência incluindo consumo, se fornecido
    return await client_1.default.transferencia.create({
        data: {
            origemId: origem.id,
            destinoId: destino.id,
            quantidade: data.quantidade,
            userId: data.userId,
            consumo: data.consumo ?? null // null se não informado
        },
        include: {
            origem: true,
            destino: true,
            usuario: true,
        },
    });
};
exports.createTransferencia = createTransferencia;
const getTransferencias = async (filters) => {
    const { origemId, destinoId, dataInicial, dataFinal } = filters;
    const where = {};
    // Filtro por origem
    if (origemId)
        where.origemId = origemId;
    // Filtro por destino
    if (destinoId) {
        if (destinoId === "consumo") {
            where.destinoId = null;
        }
        else {
            where.destinoId = destinoId;
        }
    }
    // Filtro por datas
    if (dataInicial || dataFinal) {
        where.data = {};
        if (dataInicial)
            where.data.gte = new Date(dataInicial);
        if (dataFinal) {
            const dtFinal = new Date(dataFinal);
            dtFinal.setHours(23, 59, 59, 999);
            where.data.lte = dtFinal;
        }
    }
    return await client_1.default.transferencia.findMany({
        where,
        include: { origem: true, destino: true, usuario: true },
        orderBy: { data: "desc" },
    });
};
exports.getTransferencias = getTransferencias;
