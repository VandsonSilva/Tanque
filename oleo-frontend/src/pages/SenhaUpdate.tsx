import { useState } from "react";
import api from "../services/api";
import "./UsuarioRegistro.css"; // pode reaproveitar o estilo existente

export default function AlterarSenha() {
  const [email, setEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token") || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!email || !novaSenha || !confirmarSenha) {
      setMessage("Preencha todos os campos!");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setMessage("As senhas não coincidem!");
      return;
    }

    try {
      await api.put(
        "/auth/update_password",
        { email, password: novaSenha },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("✅ Senha atualizada com sucesso!");
      setEmail("");
      setNovaSenha("");
      setConfirmarSenha("");
    } catch (err: any) {
      const msg = err?.response?.data?.error || "Erro ao atualizar senha.";
      setMessage(`❌ ${msg}`);
    }
  };

  return (
    <div className="user-register-container">
      <h1>Alterar Senha</h1>
      <form className="user-register-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Nova senha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirmar nova senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          required
        />

        <button type="submit">Atualizar Senha</button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}
