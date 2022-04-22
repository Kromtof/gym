import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./app/home/pages/HomePage";
import { AboutPage } from "./app/about/pages/AboutPage";
import { AltaPage } from "./app/socios/pages/AltaPage";
import { SociosListPage } from "./app/socios/pages/SociosListPage";
import { NavigationSidebar } from "./app/layout/components/NavigationSidebar";
import { ModificarSocioPage } from "./app/socios/pages/ModificarSocioPage";

function App() {
  useEffect(() => {
    const db = localStorage.getItem("db");
    if (!db) {
      localStorage.setItem(
        "db",
        JSON.stringify({ socios: [], ejercicios: [] })
      );
    }
  }, []);
  return (
    <>
      <NavigationSidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="altasocios" element={<AltaPage />} />
        <Route path="listasocios" element={<SociosListPage />} />
        <Route path="/modificarsocio/:id" element={<ModificarSocioPage />} />
      </Routes>
    </>
  );
}

export default App;
