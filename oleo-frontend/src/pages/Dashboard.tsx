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
          const nomesDesejados = [
            "TANQUE 01",
            "TANQUE 02",
            "TANQUE 03",
            "TANQUE 04",
            "AMANTEGAGEM",
            "EXTRUSORA",
            "TUBULAÇÃO", // adiciona aqui também para USER
          ];
          const filtrados = res.data.filter((t) => nomesDesejados.includes(t.nome));
          setTanques(filtrados);
        } else {
          setTanques(res.data);
        }
      })
      .catch(() => setTanques([]));
  }, [user]);

  // Saldo total de todos os tanques
  const saldoTotal = tanques.reduce((total, tanque) => total + tanque.volumeAtual, 0);

  // Tanques extras (exclui os principais e produção, mas mantém tubulação no array geral)
  const tanquesExtras = tanques.filter(
    (t) => t.nome.toLowerCase() !== "tubulação"
  );

  // Localiza o tanque "Tubulação" diretamente
  const tubulacao = tanques.find((t) => t.nome.toLowerCase() === "tubulação");

  // Quantidade total de óleo nos tanques extras
  const totalExtras = tanquesExtras.reduce((total, tanque) => total + tanque.volumeAtual, 0);

  return (
    <div className="container">
      <h1>Controle de Tanques</h1>

      <div className="tank-grid">
        {tanques.map((t) => (
          <TankCard key={t.id} {...t} />
        ))}
      </div>

      {/* Exibição do saldo total */}
      <div className="saldo-total">
        <h2>Saldo total do óleo: {saldoTotal.toFixed(2)}</h2>

        {/* ADMIN vê tanques extras detalhados */}
        {user?.role === "ADMIN" ? (
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
          // USER vê apenas o tanque "Tubulação"
          <p className="sobras-extras">
            Óleo na tubulação:{" "}
            <strong>{tubulacao ? tubulacao.volumeAtual.toFixed(2) : "0.00"}</strong>
          </p>
        )}
      </div>
    </div>
  );
}
