import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transferencia from "./pages/Transferencia";
import Historico from "./pages/Historico";
import TanqueRegister from "./pages/TanqueRegister";
import { AuthProvider, useAuth } from "./contexto/AuthContext";
import { Login } from "./pages/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import "./styles/global.css";

// Navbar que só aparece quando o usuário está logado
function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null; // não mostrar se não estiver logado

  return (
    <nav className="navbar">
      <Link to="/">Dashboard</Link>
      {user.role === "ADMIN" && <Link to="/transferencia">Transferência</Link>}
      {user.role === "ADMIN" && <Link to="/historico">Histórico</Link>}
      {user.role === "ADMIN" && <Link to="/registro">Registro de Tanque</Link>}
      <button onClick={logout}>Sair</button>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar /> {/* Navbar aparece aqui */}
        <Routes>
          {/* Login sempre aberto */}
          <Route path="/login" element={<Login />} />

          {/* Dashboard (User ou Admin) */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Transferência (apenas Admin) */}
          <Route
            path="/transferencia"
            element={
              <PrivateRoute role="ADMIN">
                <Transferencia />
              </PrivateRoute>
            }
          />

          {/* Histórico (apenas Admin) */}
          <Route
            path="/historico"
            element={
              <PrivateRoute role="ADMIN">
                <Historico />
              </PrivateRoute>
            }
          />

          {/* Registro de Tanque (apenas Admin) */}
          <Route
            path="/registro"
            element={
              <PrivateRoute role="ADMIN">
                <TanqueRegister />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
