import { useState } from "react";
import { TRATATIVAS } from "../../../assets/data/clienteData";
import "../../../assets/styles/ClientesToolbar.scss";

export default function ClientesToolbar({
  busca,
  setBusca,
  abrirModal,
  filtros,
  setFiltros,
}) {
  const [filtroAberto, setFiltroAberto] = useState(false);

  function handleBusca(e) {
    setBusca(e.target.value);
  }

  function toggleFiltro(value) {
    setFiltros((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value],
    );
  }

  function limparFiltros() {
    setFiltros([]);
  }

  return (
    <div className="clientes-toolbar">
      <input
        type="text"
        placeholder="Pesquisar cliente..."
        value={busca}
        onChange={handleBusca}
        className="clientes-search"
      />
      <div className="clientes-toolbar-actions">
        <button className="btn-novo" onClick={abrirModal}>
          + Novo Cliente
        </button>
        <div className="filtro-wrapper">
          <button
            className={`btn-filtros ${filtros.length > 0 ? "btn-filtros--ativo" : ""}`}
            onClick={() => setFiltroAberto(!filtroAberto)}
          >
            Filtros {filtros.length > 0 && `(${filtros.length})`}
          </button>
          {filtroAberto && (
            <div className="filtro-dropdown">
              <div className="filtro-header">
                <span>Tratativa</span>
                {filtros.length > 0 && (
                  <button onClick={limparFiltros} className="filtro-limpar">
                    Limpar
                  </button>
                )}
              </div>
              {TRATATIVAS.map((t) => (
                <label key={t.value} className="filtro-item">
                  <input
                    type="checkbox"
                    checked={filtros.includes(t.value)}
                    onChange={() => toggleFiltro(t.value)}
                  />
                  {t.label}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
