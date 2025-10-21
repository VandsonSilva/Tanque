"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAbastecimentos = exports.createAbastecimento = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const createAbastecimento = async (data) => {
    const { tanqueId, quantidade, data: dataInput, notaFiscal, userId } = data;
    // Buscar o tanque
    const tanque = await client_1.default.tanque.findUnique({ where: { id: tanqueId } });
    if (!tanque) {
        throw new Error("Tanque não encontrado");
    }
    // Atualizar volume atual do tanque
    await client_1.default.tanque.update({
        where: { id: tanqueId },
        data: { volumeAtual: tanque.volumeAtual + quantidade },
    });
    // Criar registro de abastecimento
    const abastecimento = await client_1.default.abastecimento.create({
        data: {
            tanqueId,
            quantidade,
            data: dataInput ? new Date(dataInput) : new Date(),
            notaFiscal,
            userId,
        },
    });
    return abastecimento;
};
exports.createAbastecimento = createAbastecimento;
// Listar abastecimentos
const listAbastecimentos = async () => {
    return client_1.default.abastecimento.findMany({
        include: {
            tanque: true,
            usuario: true,
        },
        orderBy: { data: "desc" },
    });
};
exports.listAbastecimentos = listAbastecimentos;
