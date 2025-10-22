import { JSX, useEffect, useState } from "react";
import { useAuth } from "../contexto/AuthContext";
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
  const { user } = useAuth();
  const [tanques, setTanques] = useState<Tanque[]>([]);

  
   useEffect(() => {
    api
      .get<Tanque[]>("/tanques")
      .then((res) => {
        if (user?.role === "USER") {
          // se for USER, mostra apenas os 4 primeiros
          const nomesDesejados = ["TANQUE 01", "TANQUE 02", "TANQUE 03", "TANQUE 04"];
          const filtrados = res.data.filter(t => nomesDesejados.includes(t.nome));
          setTanques(filtrados);
        } else {
          // se for ADMIN, mostra todos
          setTanques(res.data);
        }
      })
      .catch(() => setTanques([]));
  }, [user]);

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
