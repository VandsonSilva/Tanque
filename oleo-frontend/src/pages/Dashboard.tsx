import { JSX, useEffect, useState } from "react";
import { useAuth } from "../contexto/AuthContext";
import api from "../services/api";
import TankCard from "../components/TankCard";
import "./Dashboard.css";

// Interface dos tanques
interface Tanque {
  id: number;
  nome: string;
  capacidade: number;
  volumeAtual: number;
  tipo?: "principal" | "producao" | "extra";
}

export default function Dashboard(): JSX.Element {
  const { user } = useAuth();
  const [tanques, setTanques] = useState<Tanque[]>([]);

  useEffect(() => {
    api
      .get<Tanque[]>("/tanques")
      .then((res) => {
        if (user?.role === "USER") {
          // USER não vê TUBULAÇÃO na grade
          const nomesDesejados = [
            "TANQUE 01",
            "TANQUE 02",
            "TANQUE 03",
            "TANQUE 04",
            "AMANTEGAGEM",
            "EXTRUSORA",
          ];
          const filtrados = res.data.filter((t) => nomesDesejados.includes(t.nome));
          setTanques(filtrados);
        } else {
          // ADMIN vê tudo
          setTanques(res.data);
        }
      })
      .catch(() => setTanques([]));
  }, [user]);

  // Saldo total de todos os tanques
  const saldoTotal = tanques.reduce((total, tanque) => total + tanque.volumeAtual, 0);

  // Tanques extras (exclui tubulação)
  const tanquesExtras = tanques.filter(
    (t) => t.nome.toLowerCase() !== "tubulação"
  );

  // Localiza o tanque "Tubulação" no conjunto completo
  const [tubulacao, setTubulacao] = useState<Tanque | null>(null);

  useEffect(() => {
    api
      .get<Tanque[]>("/tanques")
      .then((res) => {
        const t = res.data.find(
          (tanque) => tanque.nome.toLowerCase() === "tubulação"
        );
        setTubulacao(t || null);
      })
      .catch(() => setTubulacao(null));
  }, []);

  // Quantidade total de óleo nos tanques extras
  const totalExtras = tanquesExtras.reduce((total, tanque) => total + tanque.volumeAtual, 0);

  return (
    <div className="container">
      <h1>Controle de Tanques</h1>

      <div className="tank-grid">
        {/* ADMIN vê todos os tanques; USER vê apenas os filtrados */}
        {tanques.map((t) => (
          <TankCard key={t.id} {...t} />
        ))}
      </div>

      {/* Exibição do saldo total */}
      <div className="saldo-total">
        <h2>Saldo total do óleo: {saldoTotal.toFixed(2)}</h2>

        {user?.role === "ADMIN" ? (
          // ADMIN vê lista detalhada dos tanques extras
          <div className="tanques-extras-admin">
            <h3>Tanques extras:</h3>
            <ul>
              {tanquesExtras.map((t) => (
                <li key={t.id}>
                  {t.nome}: {t.volumeAtual.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          // USER vê apenas a tubulação nas sobras-extras
          <p className="sobras-extras">
            Óleo na tubulação:{" "}
            <strong>
              {tubulacao ? tubulacao.volumeAtual.toFixed(2) : "0.00"}
            </strong>
          </p>
        )}
      </div>
    </div>
  );
}
