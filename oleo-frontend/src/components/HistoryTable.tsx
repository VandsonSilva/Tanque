import React from "react";

interface Transfer {
  id: number;
  origem: { id?: number; nome: string };
  destino: { id?: number; nome: string };
  quantidade: number;
  data: string;
  responsavel?: string;
}

interface Props {
  items: Transfer[];
}

export default function HistoryTable({ items }: Props) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left", padding: 8 }}>Data</th>
          <th style={{ textAlign: "left", padding: 8 }}>Origem</th>
          <th style={{ textAlign: "left", padding: 8 }}>Destino</th>
          <th style={{ textAlign: "right", padding: 8 }}>Quantidade (L)</th>
          <th style={{ textAlign: "left", padding: 8 }}>Responsável</th>
        </tr>
      </thead>
      <tbody>
        {items.map((t) => (
          <tr key={t.id} style={{ borderTop: "1px solid #eee" }}>
            <td style={{ padding: 8 }}>{new Date(t.data).toLocaleString()}</td>
            <td style={{ padding: 8 }}>{t.origem?.nome}</td>
            <td style={{ padding: 8 }}>{t.destino?.nome}</td>
            <td style={{ padding: 8, textAlign: "right" }}>{Number(t.quantidade.toFixed(2))}</td>
            <td style={{ padding: 8 }}>{t.responsavel ?? "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
