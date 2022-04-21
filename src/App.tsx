import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./app/home/pages/HomePage";
import { AboutPage } from "./app/about/pages/AboutPage";
import { AltaPage } from "./app/socios/pages/AltaPage";
import { SociosListPage } from "./app/socios/pages/SociosListPage";
import { NavigationSidebar } from "./app/layout/components/NavigationSidebar";

function App() {
  return (
    <>
      <NavigationSidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="altasocios" element={<AltaPage />} />
        <Route path="listasocios" element={<SociosListPage />} />
      </Routes>
    </>
  );
}

export default App;
