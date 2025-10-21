import { useState } from "react";
import api  from "../services/api";
import "./TanqueRegister.css"

interface TanqueFormData {
  nome: string;
  capacidade: number;
  tipo: string; // ex: Óleo, Diesel, etc.
  descricao?: string;
}

export default function TanqueRegister() {
  const [form, setForm] = useState<TanqueFormData>({
    nome: "",
    capacidade: 0,
    tipo: "",
    descricao: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "capacidade" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.nome || !form.capacidade || !form.tipo) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/tanques", form);
      setSuccess("Tanque cadastrado com sucesso!");
      setForm({ nome: "", capacidade: 0, tipo: "", descricao: "" });
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao cadastrar tanque.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Tanque</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome do Tanque"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="capacidade"
          placeholder="Capacidade (L)"
          value={form.capacidade}
          onChange={handleChange}
          required
        />
        <select name="tipo" value={form.tipo} onChange={handleChange} required>
          <option value="">Selecione o tipo</option>
          <option value="Óleo">Óleo</option>
          <option value="Diesel">Diesel</option>
          <option value="Gasolina">Gasolina</option>
        </select>
        <input
          type="text"
          name="descricao"
          placeholder="Descrição (opcional)"
          value={form.descricao}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
}
