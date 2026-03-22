import { useState, useEffect } from "react";
import {
  TRATATIVAS,
  FORMAS_PROSPECCAO,
  AREAS_ATUACAO,
} from "../../../assets/data/clienteData";
import "../../../assets/styles/ClientesToolbar.scss";

const GRUPOS_FILTRO = [
  {
    label: "Tratativa",
    campo: "resumoUltimaTratativa",
    opcoes: TRATATIVAS.map((t) => ({ label: t.label, value: t.value })),
  },
  {
    label: "Forma de Prospecção",
    campo: "formaProspeccao",
    opcoes: FORMAS_PROSPECCAO.map((f) => ({ label: f, value: f })),
  },
  {
    label: "Área de Atuação",
    campo: "areaAtuacao",
    opcoes: AREAS_ATUACAO.map((a) => ({ label: a, value: a })),
  },
];

function carregarFiltros() {
  try {
    const salvo = localStorage.getItem("clientes-filtros");
    return salvo ? JSON.parse(salvo) : {};
  } catch {
    return {};
  }
}

export default function ClientesToolbar({
  busca,
  setBusca,
  abrirModal,
  filtros,
  setFiltros,
}) {
  const [filtroAberto, setFiltroAberto] = useState(false);

  useEffect(() => {
    const inicial = carregarFiltros();
    if (Object.keys(inicial).length > 0) {
      setFiltros(inicial);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("clientes-filtros", JSON.stringify(filtros));
  }, [filtros]);

  function handleBusca(e) {
    setBusca(e.target.value);
  }

  function toggleFiltro(campo, value) {
    setFiltros((prev) => {
      const atual = prev[campo] || [];
      return {
        ...prev,
        [campo]: atual.includes(value)
          ? atual.filter((f) => f !== value)
          : [...atual, value],
      };
    });
  }

  function limparFiltros() {
    setFiltros({});
  }

  const totalAtivos = Object.values(filtros).flat().length;

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
            className={`btn-filtros ${totalAtivos > 0 ? "btn-filtros--ativo" : ""}`}
            onClick={() => setFiltroAberto(!filtroAberto)}
          >
            Filtros {totalAtivos > 0 && `(${totalAtivos})`}
          </button>
          {filtroAberto && (
            <div className="filtro-dropdown">
              <div className="filtro-header">
                <span>Filtros</span>
                {totalAtivos > 0 && (
                  <button onClick={limparFiltros} className="filtro-limpar">
                    Limpar tudo
                  </button>
                )}
              </div>
              {GRUPOS_FILTRO.map((grupo) => (
                <div key={grupo.campo} className="filtro-grupo">
                  <p className="filtro-grupo-label">{grupo.label}</p>
                  {grupo.opcoes.map((op) => (
                    <label key={op.value} className="filtro-item">
                      <input
                        type="checkbox"
                        checked={(filtros[grupo.campo] || []).includes(
                          op.value,
                        )}
                        onChange={() => toggleFiltro(grupo.campo, op.value)}
                      />
                      {op.label}
                    </label>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
