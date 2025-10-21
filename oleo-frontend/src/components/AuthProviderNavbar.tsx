import { useAuth } from "../contexto/AuthContext";
import { Link } from "react-router-dom";

function AuthProviderNavbar() {
  const { user, logout } = useAuth();

  if (!user) return null; // não mostra navbar se não logado

  return (
    <nav className="navbar">
      <Link to="/">Tanques</Link>
      {user.role === "ADMIN" && (
        <>
          <Link to="/transferencia">Transferência</Link>
          <Link to="/historico">Histórico</Link>
          <Link to="/registro">Registro</Link>
          <Link to="/abastecimento">Abastecimento</Link>
        </>
      )}
      <button onClick={logout}>Sair</button>
    </nav>
  );
}
