import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./app/home/pages/HomePage";
import { AboutPage } from "./app/about/pages/AboutPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
    </Routes>
  );
}

export default App;
