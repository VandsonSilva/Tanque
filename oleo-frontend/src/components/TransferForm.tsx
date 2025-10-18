import React, { JSX, useEffect, useState } from "react";
import api  from "../services/api";

// Interface para os tanques
export interface TanqueOption {
  id: number;
  nome: string;
  tipo: "principal" | "producao";
  volumeAtual: number;
  capacidade: number;
}

// Props do componente
interface Props {
  onSuccess?: () => void;
}

export default function TransferForm({ onSuccess }: Props): JSX.Element {
  const [tanques, setTanques] = useState<TanqueOption[]>([]);
  const [origem, setOrigem] = useState<number | "">("");
  const [destino, setDestino] = useState<number | "">("");
  const [quantidade, setQuantidade] = useState<number | "">("");
  const [responsavel, setResponsavel] = useState<string>("");

  // Carregar tanques da API
  useEffect(() => {
    api
      .get<TanqueOption[]>("/tanques")
      .then((res) => setTanques(res.data))
      .catch(() => setTanques([]));
  }, []);

  const principais = tanques.filter((t) => t.tipo === "principal");
  const producao = tanques.filter((t) => t.tipo === "producao");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!origem || !destino) return alert("Escolha origem e destino");
    if (!quantidade || Number(quantidade) <= 0) return alert("Quantidade inválida");

    try {
      await api.post("/transferencias", {
        origemId: Number(origem),
        destinoId: Number(destino),
        quantidade: Number(quantidade),
        responsavel: responsavel || "não informado",
      });

      alert("Transferência registrada!");
      setQuantidade("");
      setOrigem("");
      setDestino("");
      setResponsavel("");
      onSuccess?.();
    } catch (err: any) {
      const msg = err?.response?.data?.error || err?.message || "Erro ao transferir";
      alert(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form" style={{ maxWidth: 480 }}>
      <label>Tanque de Origem (principais)</label>
      <select
        value={origem}
        onChange={(e) => setOrigem(e.target.value === "" ? "" : Number(e.target.value))}
        required
      >
        <option value="">Selecione...</option>
        {principais.map((t) => (
          <option key={t.id} value={t.id}>
            {t.nome} — {t.volumeAtual}L
          </option>
        ))}
      </select>

      <label>Tanque de Destino (produção)</label>
      <select
        value={destino}
        onChange={(e) => setDestino(e.target.value === "" ? "" : Number(e.target.value))}
        required
      >
        <option value="">Selecione...</option>
        {producao.map((t) => (
          <option key={t.id} value={t.id}>
            {t.nome} — {t.volumeAtual}L
          </option>
        ))}
      </select>

      <label>Quantidade (L)</label>
      <input
        type="number"
        min="0"
        step="0.01"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value === "" ? "" : Number(e.target.value))}
        required
      />

      <label>Responsável (opcional)</label>
      <input value={responsavel} onChange={(e) => setResponsavel(e.target.value)} />

      <button type="submit">Transferir</button>
    </form>
  );
}
