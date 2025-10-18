import { NavLink } from "react-router-dom";
import "../styles/global.css";
import { JSX } from "react";

export default function Navbar(): JSX.Element {
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        end={true}
        className={({ isActive }) => (isActive ? "active" : "")} // CORRETO: isActive vem do objeto
      >
        Tanques
      </NavLink>

      <NavLink
        to="/transferencia"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Transferência
      </NavLink>

      <NavLink
        to="/historico"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Histórico
      </NavLink>
    </nav>
  );
}
