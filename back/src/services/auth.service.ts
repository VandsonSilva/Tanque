import  {Role}  from "@prisma/client";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "chave-secreta";

export const register = async (nome: string, email: string, password: string, role: string = "USER") => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Email já cadastrado");

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { nome, email, password: hashed, role: role as Role },
  });

  return { id: user.id, nome: user.nome, email: user.email, role: user.role };
};


export const updatePassword = async (email: string, newPassword: string) => {
  const existing = await prisma.user.findUnique({ where: { email } });

  if (!existing) {
    throw new Error("Usuário não encontrado");
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  const updatedUser = await prisma.user.update({
    where: { email },
    data: {
      password: hashed,      
    },
  });

  return updatedUser;
};


export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Usuário não encontrado");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Senha incorreta");

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "8h" }
  );

  return {
    token,
    user: { id: user.id, nome: user.nome, email: user.email, role: user.role },
  };
};
