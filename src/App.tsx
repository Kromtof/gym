import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./app/home/pages/HomePage";
import { AboutPage } from "./app/about/pages/AboutPage";
import { AltaPage } from "./app/socios/pages/AltaPage";
import { SociosListPage } from "./app/socios/pages/SociosListPage";
import { NavigationSidebar } from "./app/layout/components/NavigationSidebar";
import { ModificarSocioPage } from "./app/socios/pages/ModificarSocioPage";
import { AltaEjercicioPage } from "./app/ejercicios/pages/AltaEjercicioPage";
import { ListaEjerciciosPage } from "./app/ejercicios/pages/ListaEjerciciosPage";
import { CreateRutinaPage } from "./app/rutinas/pages/CreateRutinaPage";

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
        <Route path="altaejercicio" element={<AltaEjercicioPage />} />
        <Route path="listaejercicios" element={<ListaEjerciciosPage />} />
        <Route path="crearrutina" element={<CreateRutinaPage />} />
      </Routes>
    </>
  );
}

export default App;
