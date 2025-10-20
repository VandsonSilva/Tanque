import prisma from "../prisma/client";

interface TransferData {
  origemId: number;
  destinoId: number;
  quantidade: number;
  
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

  // Registra a transferência
  return await prisma.transferencia.create({
    data: {
      origemId: origem.id,
      destinoId: destino.id,
      quantidade: data.quantidade,
    },
    include: {
      origem: true,
      destino: true,
    },
  });
};

export const getAllTransferencias = async () => {
  return await prisma.transferencia.findMany({
    include: {
      origem: true,
      destino: true,
    },
    orderBy: { data: "desc" },
  });
};
