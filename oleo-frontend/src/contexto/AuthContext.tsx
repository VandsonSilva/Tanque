import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

interface User {
  id: number;
  nome: string;
  email: string;
  role: "ADMIN" | "USER";
}

interface LoginResponse {
  token: string;
  user: User;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  const data = res.data as { 
    token: string; 
    user: { id: number; nome: string; email: string; role: string } 
  };

  const { token } = data;

  // 🔥 Convertemos a role vinda da API para o tipo literal esperado
  const normalizedRole = data.user.role.toUpperCase() === "ADMIN" ? "ADMIN" : "USER";

  const user: User = {
    id: data.user.id,
    nome: data.user.nome,
    email: data.user.email,
      role: normalizedRole as "ADMIN" | "USER",
  };

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  setUser(user);
};



  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
