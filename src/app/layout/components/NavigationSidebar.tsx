import React from "react";
import { Link } from "react-router-dom";
import "./NavigationSidebar.css";

export const NavigationSidebar = () => {
  return (
    <div>
      <div className="sidebar">
        <Link to="/">Home</Link>

        <Link to="/altasocios">Registrarme</Link>

        <Link to="/listasocios">Socios</Link>
      </div>
    </div>
  );
};
