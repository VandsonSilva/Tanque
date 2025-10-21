import prisma from "../prisma/client";

interface TransferData {
  origemId: number;
  destinoId: number;
  quantidade: number;
  userId: number;
  consumo?: number; 
}

export const createTransferencia = async (data: TransferData) => {
  const origem = await prisma.tanque.findUnique({ where: { id: data.origemId } });
  const destino = await prisma.tanque.findUnique({ where: { id: data.destinoId } });

  if (!origem || !destino) throw new Error("Tanque não encontrado");
  if (data.quantidade > origem.volumeAtual) throw new Error("Volume insuficiente no tanque de origem");

  // Atualiza os volumes
  await prisma.tanque.update({
    where: { id: origem.id },
    data: { volumeAtual: origem.volumeAtual - data.quantidade },
  });

  await prisma.tanque.update({
    where: { id: destino.id },
    data: { volumeAtual: destino.volumeAtual + data.quantidade },
  });

  // Cria a transferência incluindo consumo, se fornecido
  return await prisma.transferencia.create({
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


interface FilterTransferencia {
  origemId?: number;
  destinoId?: number | "consumo";
  dataInicial?: string;
  dataFinal?: string;
}

export const getTransferencias = async (filters: FilterTransferencia) => {
  const { origemId, destinoId, dataInicial, dataFinal } = filters;
  const where: any = {};

  // Filtro por origem
  if (origemId) where.origemId = origemId;

  // Filtro por destino
  if (destinoId) {
    if (destinoId === "consumo") {
      where.destinoId = null;
    } else {
      where.destinoId = destinoId;
    }
  }

  // Filtro por datas
  if (dataInicial || dataFinal) {
    where.data = {};
    if (dataInicial) where.data.gte = new Date(dataInicial);
    if (dataFinal) {
      const dtFinal = new Date(dataFinal);
      dtFinal.setHours(23, 59, 59, 999);
      where.data.lte = dtFinal;
    }
  }

  return await prisma.transferencia.findMany({
    where,
    include: { origem: true, destino: true, usuario: true },
    orderBy: { data: "desc" },
  });
};
