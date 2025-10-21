import prisma from "../prisma/client";

interface AbastecimentoData {
  tanqueId: number;
  quantidade: number;
  data?: string;
  notaFiscal: string;
  userId: number;
  
}

export const createAbastecimento = async (data: AbastecimentoData) => {
  const { tanqueId, quantidade, data: dataInput, notaFiscal ,userId } = data;

  // Buscar o tanque
  const tanque = await prisma.tanque.findUnique({ where: { id: tanqueId } });
  if (!tanque) {
    throw new Error("Tanque não encontrado");
  }

  // Atualizar volume atual do tanque
  await prisma.tanque.update({
    where: { id: tanqueId },
    data: { volumeAtual: tanque.volumeAtual + quantidade },
  });

  // Criar registro de abastecimento
  const abastecimento = await prisma.abastecimento.create({
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

// Listar abastecimentos
export const listAbastecimentos = async () => {
  return prisma.abastecimento.findMany({
    include: {
      tanque: true,
      usuario: true,
    },
    orderBy: { data: "desc" },
  });
};
