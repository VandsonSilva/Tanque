import { JSX, useEffect, useState } from "react";
import api from "../services/api";
import TankCard from "../components/TankCard";
import "./Abastecimento.css";


interface Tanque {
  id: number;
  nome: string;
  capacidade: number;
  volumeAtual: number;
  tipo?: "principal" | "producao";
}

export default function Abastecimento(): JSX.Element {
  const [tanques, setTanques] = useState<Tanque[]>([]);
  const [tanqueId, setTanqueId] = useState<number | "">("");
  const [quantidade, setQuantidade] = useState<number | "">("");
  const [notaFiscal, setNotaFiscal] = useState("");
  const [data, setData] = useState("");
  const token = localStorage.getItem("token") || "";

  // 🔹 Carregar tanques existentes
  useEffect(() => {
    api
      .get<Tanque[]>("/tanques", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setTanques(res.data))
      .catch(() => setTanques([]));
  }, [token]);

  // 🔹 Registrar abastecimento
  const handleAbastecer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!tanqueId || !quantidade || Number(quantidade) <= 0) {
      alert("Preencha todos os campos corretamente!");
      return;
    }
    console.log("Token enviado:", token);
    try {
      await api.post(
        "/abastecimentos",
        {
          tanqueId,
          quantidade: Number(quantidade),
          notaFiscal: notaFiscal || null,
          data: data ? new Date(data).toISOString() : new Date().toISOString(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Abastecimento registrado com sucesso!");
      setTanqueId("");
      setQuantidade("");
      setNotaFiscal("");
      setData("");

      // Atualiza lista de tanques com volumes atualizados
      const res = await api.get<Tanque[]>("/tanques", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTanques(res.data);
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data?.error ||
        err?.message ||
        "Erro ao registrar abastecimento";
      alert(msg);
    }
  };

  return (
    <div className="container">
      <h1>⛽ Abastecimento de Tanques</h1>

      <div className="tank-grid">
        {tanques.length > 0 ? (
          tanques.map((t) => <TankCard key={t.id} {...t} />)
        ) : (
          <p>Nenhum tanque encontrado.</p>
        )}
      </div>

      <form className="form-container" onSubmit={handleAbastecer}>
        <h2>Novo Abastecimento</h2>

        <label>Tanque</label>
        <select
          value={tanqueId}
          onChange={(e) =>
            setTanqueId(e.target.value === "" ? "" : Number(e.target.value))
          }
          required
        >
          <option value="">Selecione o tanque</option>
          {tanques.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nome} — {t.volumeAtual}L / {t.capacidade}L
            </option>
          ))}
        </select>

        <label>Quantidade (litros)</label>
        <input
          type="number"
          placeholder="Ex: 500"
          min={1}
          step={0.01}
          value={quantidade}
          onChange={(e) =>
            setQuantidade(e.target.value === "" ? "" : Number(e.target.value))
          }
          required
        />

        <label>Nota Fiscal (opcional)</label>
        <input
          type="text"
          placeholder="Número da Nota Fiscal"
          value={notaFiscal}
          onChange={(e) => setNotaFiscal(e.target.value)}
        />

        <label>Data (opcional)</label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />

        <button type="submit">Registrar Abastecimento</button>
      </form>
    </div>
  );
}
