import { User } from "@prisma/client"; // ou apenas um id, dependendo do que você armazena no JWT

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email?: string;
        role?: string;
      };
    }
  }
}
