import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transferencia from "./pages/Transferencia";
import Historico from "./pages/Historico";
import TanqueRegister from './pages/TanqueRegister'
import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/">Tanques</Link>
        <Link to="/transferencia">Transferência</Link>
        <Link to="/historico">Histórico</Link>
        <Link to="/registro">Registro</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transferencia" element={<Transferencia />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/registro" element={<TanqueRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
