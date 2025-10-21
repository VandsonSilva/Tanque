import { JSX, useEffect, useState } from "react";
import  api  from "../services/api";
import TankCard from "../components/TankCard";
import "./Dashboard.css"

// Interface dos tanques
interface Tanque {
  id: number;
  nome: string;
  capacidade: number;
  volumeAtual: number;
  tipo?: "principal" | "producao";
}

export default function Dashboard(): JSX.Element {
  const [tanques, setTanques] = useState<Tanque[]>([]);

  // Carregar tanques da API
  useEffect(() => {
    api
      .get<Tanque[]>("/tanques")
      .then((res) => setTanques(res.data))
      .catch(() => setTanques([]));
  }, []);

  return (
    <div className="container">
      <h1>Controle de Tanques</h1>
      <div className="tank-grid">
        {tanques.map((t) => (
          <TankCard key={t.id} {...t} />
        ))}
      </div>
    </div>
  );
}
