import { useState } from "react";
import api from "../services/api";
import "./UsuarioRegistro.css";

export default function UsuarioRegistro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER"); // padrão
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token") || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!nome || !email || !password) {
      setMessage("Preencha todos os campos!");
      return;
    }

    try {
      const res = await api.post(
        "/auth/register",
        { nome, email, password, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Usuário criado com sucesso!");
      setNome("");
      setEmail("");
      setPassword("");
      setRole("USER");
    } catch (err: any) {
      const msg =
        err?.response?.data?.error || "Erro ao criar usuário. Verifique as permissões.";
      setMessage(`❌ ${msg}`);
    }
  };

  return (
    <div className="user-register-container">
      <h1>Cadastrar Usuário</h1>
      <form className="user-register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="E-mail"
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

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="PORTEIRO">Usuario</option>
          <option value="ADMIN">Administrador</option>
        </select>

        <button type="submit">Cadastrar</button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}
