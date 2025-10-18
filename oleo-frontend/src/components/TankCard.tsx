import React from "react";

interface TankCardProps {
  id?: number;
  nome: string;
  capacidade: number;
  volumeAtual: number;
  tipo?: string;
}

export default function TankCard({ nome, capacidade, volumeAtual, tipo }: TankCardProps) {
  const pct = capacidade > 0 ? Math.max(0, Math.min(100, (volumeAtual / capacidade) * 100)) : 0;

  return (
    <div className="tank-card" role="article" aria-label={`Tanque ${nome}`}>
      <h3>{nome}</h3>
      {tipo && <small>Tipo: {tipo}</small>}
      <p>
        {Number(volumeAtual.toFixed(2))} / {Number(capacidade.toFixed(2))} L
      </p>

      <div className="progress" aria-hidden>
        <div className="bar" style={{ width: `${pct}%` }} />
      </div>

      <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", fontSize: 13 }}>
        <span>{pct.toFixed(0)}%</span>
        <span>{(capacidade - volumeAtual).toFixed(2)} L livre</span>
      </div>
    </div>
  );
}
