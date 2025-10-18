import { JSX, useEffect, useState } from "react";
import  api  from "../services/api";

// Interface para cada transferência
interface Transferencia {
  id: number;
  origem: { nome: string };
  destino: { nome: string };
  quantidade: number;
  data: string; // ISO string
}

export default function Historico(): JSX.Element {
  const [transfs, setTransfs] = useState<Transferencia[]>([]);

  useEffect(() => {
    api
      .get<Transferencia[]>("/transferencias")
      .then((res) => setTransfs(res.data))
      .catch(() => setTransfs([]));
  }, []);

  return (
    <div className="container">
      <h1>Histórico de Transferências</h1>

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
              <td>{t.destino.nome}</td>
              <td>{t.quantidade.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
