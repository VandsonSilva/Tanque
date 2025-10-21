import { useState } from "react";
import { useAuth } from "../contexto/AuthContext";
import api from "../services/api";
import "./Login.css"

export const Login = () => {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });

      // tipagem explícita da resposta
      const data = res.data as {
        token: string;
        user: { id: number; nome: string; email: string; role: string };
      };

      const { token } = data;

      // 🔥 Normaliza a role para o tipo literal do User
      const normalizedRole = data.user.role.toUpperCase() === "ADMIN" ? "ADMIN" : "USER";

      const user = {
        id: data.user.id,
        nome: data.user.nome,
        email: data.user.email,
        role: normalizedRole as "ADMIN" | "USER",
      };

      // salva token e usuário localmente
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user); // ✅ compatível com User

      // redireciona conforme o cargo
      if (user.role === "ADMIN") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || "Credenciais inválidas ou erro no servidor."
      );
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};
