/// <reference types="node" />
import { User } from "@prisma/client"; // apenas se você precisar dos tipos do User no JWT

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
