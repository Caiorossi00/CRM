import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Clientes from "./pages/ClientesLista";
import ClienteDetalhe from "./pages/ClienteDetalhe";
import "./App.css";
import Mural from "./pages/Mural";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/clientes" />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/clientes/:id" element={<ClienteDetalhe />} />
            <Route path="/mural" element={<Mural />} />
            <Route path="/configuracoes" element={<h1>Configurações</h1>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
