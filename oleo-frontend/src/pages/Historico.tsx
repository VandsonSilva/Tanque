import { JSX, useEffect, useState } from "react";
import api from "../services/api";
import "./Historico.css"

interface Transferencia {
  id: number;
  origem: { nome: string };
  destino: { nome: string } | null; // pode ser consumo
  quantidade: number;
  consumo?: number;
  data: string; // ISO string
}

interface Tanque {
  id: number;
  nome: string;
}

export default function Historico(): JSX.Element {
  const [transfs, setTransfs] = useState<Transferencia[]>([]);
  const [tanques, setTanques] = useState<Tanque[]>([]);
  const [origemFilter, setOrigemFilter] = useState<number | "">("");
  const [destinoFilter, setDestinoFilter] = useState<number | "">("");
  const [dataInicial, setDataInicial] = useState<string>("");
  const [dataFinal, setDataFinal] = useState<string>("");

  const token = localStorage.getItem("token") || "";

  // Carregar transferências
  const loadTransferencias = async () => {
    try {
      const params: any = {};
      if (origemFilter) params.origemId = origemFilter;
      if (destinoFilter) params.destinoId = destinoFilter;
      if (dataInicial) params.dataInicial = dataInicial;
      if (dataFinal) params.dataFinal = dataFinal;

      const res = await api.get<Transferencia[]>("/transferencias", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setTransfs(res.data);
    } catch {
      setTransfs([]);
    }
  };

  // Carregar tanques para os filtros
  useEffect(() => {
    api
      .get<Tanque[]>("/tanques", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setTanques(res.data))
      .catch(() => setTanques([]));
  }, [token]);

  // Carregar histórico
  useEffect(() => {
    loadTransferencias();
  }, []); // primeira carga

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    loadTransferencias();
  };

  return (
    <div className="container">
      <h1>Histórico de Transferências</h1>

      <form onSubmit={handleFilter} className="form-filtro">
        <select
          value={origemFilter}
          onChange={(e) => setOrigemFilter(e.target.value === "" ? "" : Number(e.target.value))}
        >
          <option value="">Origem (todos)</option>
          {tanques.map((t) => (
            <option key={t.id} value={t.id}>{t.nome}</option>
          ))}
        </select>

        <select
          value={destinoFilter}
          onChange={(e) => setDestinoFilter(e.target.value === "" ? "" : Number(e.target.value))}
        >
          <option value="">Destino (todos)</option>
          {tanques.map((t) => (
            <option key={t.id} value={t.id}>{t.nome}</option>
          ))}
          <option value="consumo">Consumo</option>
        </select>

        <input
          type="date"
          value={dataInicial}
          onChange={(e) => setDataInicial(e.target.value)}
        />
        <input
          type="date"
          value={dataFinal}
          onChange={(e) => setDataFinal(e.target.value)}
        />

        <button type="submit">Filtrar</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Origem</th>
            <th>Destino</th>
            <th>Quantidade (L)</th>
          </tr>
        </thead>
        <tbody>
          {transfs.map((t) => (
            <tr key={t.id}>
              <td>{new Date(t.data).toLocaleString()}</td>
              <td>{t.origem.nome}</td>
              <td>{t.destino?.nome || "Consumo"}</td>
              <td>{t.quantidade.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
