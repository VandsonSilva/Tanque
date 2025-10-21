import { JSX, useEffect, useState } from "react";
import api from "../services/api";
import TankCard from "../components/TankCard";
import "./Transferencia.css"

interface Tanque {
  id: number;
  nome: string;
  capacidade: number;
  volumeAtual: number;
  tipo?: "principal" | "producao";
}

export default function Transferencia(): JSX.Element {
  const [tanques, setTanques] = useState<Tanque[]>([]);
  const [origemId, setOrigemId] = useState<number | "">("");
  const [destinoId, setDestinoId] = useState<number | "">("");
  const [quantidade, setQuantidade] = useState<number | "">("");

  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    api
      .get<Tanque[]>("/tanques", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setTanques(res.data))
      .catch(() => setTanques([]));
  }, [token]);

  const handleTransferir = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!origemId || !destinoId || !quantidade || Number(quantidade) <= 0) {
      alert("Preencha todos os campos corretamente!");
      return;
    }
    if (origemId === destinoId) {
      alert("Origem e destino não podem ser iguais!");
      return;
    }

    try {
      await api.post(
        "/transferencias",
        {
          origemId,
          destinoId,
          quantidade: Number(quantidade),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Transferência realizada!");
      setOrigemId("");
      setDestinoId("");
      setQuantidade("");

      const res = await api.get<Tanque[]>("/tanques", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTanques(res.data);
    } catch (err: any) {
      console.error(err);
      const msg = err?.response?.data?.error || err?.message || "Erro ao transferir óleo";
      alert(msg);
    }
  };

  return (
    <div className="container">
      <h1>Transferência de Óleo</h1>

      <div className="tank-grid">
        {tanques.map((t) => (
          <TankCard key={t.id} {...t} />
        ))}
      </div>

      <form className="form-container" onSubmit={handleTransferir}>
        <h2>Nova Transferência</h2>

        {/* Origem */}
        <select
          value={origemId}
          onChange={(e) => setOrigemId(e.target.value === "" ? "" : Number(e.target.value))}
          required
        >
          <option value="">Tanque de origem</option>
          {tanques.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nome} — {t.volumeAtual}L
            </option>
          ))}
        </select>

        {/* Destino */}
        <select
          value={destinoId}
          onChange={(e) => setDestinoId(e.target.value === "" ? "" : Number(e.target.value))}
          required
        >
          <option value="">Tanque de destino</option>
          {tanques.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nome} — {t.volumeAtual}L
            </option>
          ))}
          {/* Opção de consumo */}
          
        </select>

        <input
          type="number"
          placeholder="Quantidade em litros"
          min={1}
          step={0.01}
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value === "" ? "" : Number(e.target.value))}
          required
        />

        <button type="submit">Transferir</button>
      </form>
    </div>
  );
}
