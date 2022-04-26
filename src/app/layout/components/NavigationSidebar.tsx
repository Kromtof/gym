import React from "react";
import { Link } from "react-router-dom";
import "./NavigationSidebar.css";

export const NavigationSidebar = () => {
  return (
    <div>
      <div className="sidebar">
        <h3 id="titulo">Socios</h3>
        <Link to="/">Home</Link>

        <Link to="/altasocios">Cargar Socio</Link>

        <Link to="/listasocios">Listado Socios</Link>
        <h3 id="titulo">Ejercicios</h3>
        <Link to="/altaejercicio">Cargar Ejercicio</Link>

        <Link to="/listaejercicios">Listado Ejercicios</Link>
      </div>
    </div>
  );
};
