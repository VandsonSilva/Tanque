import { useState, useEffect } from "react";
import api from "../services/api";
import "./TanqueRegister.css";

interface TanqueFormData {
  nome: string;
  capacidade: number;
  tipo: string;
  descricao?: string;
}

interface Tanque extends TanqueFormData {
  id: number;
}

export default function TanqueRegister() {
  const [modo, setModo] = useState<"cadastrar" | "excluir">("cadastrar");
  const [form, setForm] = useState<TanqueFormData>({
    nome: "",
    capacidade: 0,
    tipo: "",
    descricao: "",
  });
  const [tanques, setTanques] = useState<Tanque[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Função para carregar todos os tanques
  const loadTanques = async () => {
    try {
      const res = await api.get<Tanque[]>("/tanques");
      setTanques(res.data);
    } catch {
      setTanques([]);
    }
  };

  useEffect(() => {
    loadTanques();
  }, []);

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
      await loadTanques(); // Recarrega a lista após cadastrar
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao cadastrar tanque.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente excluir este tanque?")) return;

    try {
      await api.delete(`/tanques/${id}`);
      setSuccess("Tanque excluído com sucesso!");
      await loadTanques(); // Recarrega a lista após exclusão
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao excluir tanque.");
    }
  };

  return (
    <div className="form-container">
      <h2>Gestão de Tanques</h2>

      {/* Botões de opção */}
      <div className="modo-buttons">
        <button
          className={modo === "cadastrar" ? "active" : ""}
          onClick={() => setModo("cadastrar")}
        >
          Cadastrar Tanque
        </button>
        <button
          className={modo === "excluir" ? "active" : ""}
          onClick={() => setModo("excluir")}
        >
          Excluir Tanque
        </button>
      </div>

      {/* Formulário de cadastro */}
      {modo === "cadastrar" && (
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
      )}

      {/* Lista de tanques para exclusão */}
      {modo === "excluir" && (
        <ul className="tanque-list">
          {tanques.map((t) => (
            <li key={t.id}>
              {t.nome} - {t.capacidade}L - {t.tipo}{" "}
              <button onClick={() => handleDelete(t.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
