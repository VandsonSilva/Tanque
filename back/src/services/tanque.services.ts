import prisma from "../prisma/client";

interface CreateTanqueData {
  nome: string;
  tipo: string;
  capacidade: number;
}

export const getAllTanques = async () => {
  return await prisma.tanque.findMany();
};

export const deleteTanques = async (id: number) => {
  return await prisma.tanque.delete({
    where: { id },
  });
};




export const getTanqueById = async (id: number) => {
  return await prisma.tanque.findUnique({ where: { id } });
};

export const createTanque = async (data: CreateTanqueData) => {
  // Cria um tanque no banco
  return await prisma.tanque.create({
    data: {
      nome: data.nome,
      tipo: data.tipo,
      capacidade: data.capacidade,
      volumeAtual: 0, // volume inicial sempre zero
    },
  });
};
