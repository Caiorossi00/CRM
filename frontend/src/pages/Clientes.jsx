import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { formatarData } from "../utils/dateUtils";
import Modal from "../components/Modal";
import ClienteForm from "../components/ClienteForm";
import "../assets/styles/Clientes.scss";

const ITENS_POR_PAGINA = 10;

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const [modalAberto, setModalAberto] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [menuAberto, setMenuAberto] = useState(null);
  const menuRef = useRef(null);

  async function buscarClientes() {
    const res = await fetch("http://localhost:3000/clientes");
    const data = await res.json();
    setClientes(data);
  }

  useEffect(() => {
    buscarClientes();
  }, []);

  useEffect(() => {
    function handleClickFora(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAberto(null);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  async function adicionarCliente(cliente) {
    await fetch("http://localhost:3000/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    });
    await buscarClientes();
  }

  async function editarCliente(clienteAtualizado) {
    await fetch(`http://localhost:3000/clientes/${clienteAtualizado.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clienteAtualizado),
    });
    setClienteEditando(null);
    await buscarClientes();
  }

  async function removerCliente(id) {
    await fetch(`http://localhost:3000/clientes/${id}`, {
      method: "DELETE",
    });
    setMenuAberto(null);
    await buscarClientes();
  }

  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nome?.toLowerCase().includes(busca.toLowerCase()) ||
      c.telefone?.includes(busca),
  );

  const totalPaginas = Math.ceil(clientesFiltrados.length / ITENS_POR_PAGINA);
  const clientesPagina = clientesFiltrados.slice(
    (pagina - 1) * ITENS_POR_PAGINA,
    pagina * ITENS_POR_PAGINA,
  );

  function handleBusca(e) {
    setBusca(e.target.value);
    setPagina(1);
  }

  return (
    <div className="clientes-page">
      <div className="clientes-header">
        <div>
          <h1>Gestão de Clientes</h1>
          <p>Lista de Clientes Cadastrados</p>
        </div>
      </div>

      <div className="clientes-toolbar">
        <input
          type="text"
          placeholder="Pesquisar cliente..."
          value={busca}
          onChange={handleBusca}
          className="clientes-search"
        />
        <div className="clientes-toolbar-actions">
          <button className="btn-novo" onClick={() => setModalAberto(true)}>
            + Novo Cliente
          </button>
        </div>
      </div>

      <table className="clientes-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Último Contato</th>
            <th>Forma de Prospecção</th>
            <th>Área de Atuação</th>
            <th>Resumo da Demanda</th>
            <th>Resumo da Última Tratativa</th>
            <th>Se não contratou, qual o motivo?</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientesPagina.map((c) => (
            <tr key={c.id}>
              <td>
                <Link to={`/clientes/${c.id}`}>{c.nome}</Link>
              </td>
              <td>{c.telefone}</td>
              <td>{formatarData(c.ultimoContato)}</td>
              <td>{c.formaProspeccao}</td>
              <td>{c.areaAtuacao}</td>
              <td className="td-resumo">{c.resumoDemanda}</td>
              <td className="td-resumo">{c.resumoUltimaTratativa}</td>
              <td className="td-resumo">{c.motivoNaoContratado}</td>
              <td className="acoes-cell">
                <div
                  className="menu-wrapper"
                  ref={menuAberto === c.id ? menuRef : null}
                >
                  <button
                    className="btn-menu"
                    onClick={() =>
                      setMenuAberto(menuAberto === c.id ? null : c.id)
                    }
                  >
                    ···
                  </button>
                  {menuAberto === c.id && (
                    <div className="menu-dropdown">
                      <button
                        onClick={() => {
                          setClienteEditando(c);
                          setMenuAberto(null);
                        }}
                      >
                        Editar
                      </button>
                      <button onClick={() => removerCliente(c.id)}>
                        Excluir
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="clientes-footer">
        <span>
          {(pagina - 1) * ITENS_POR_PAGINA + 1}–
          {Math.min(pagina * ITENS_POR_PAGINA, clientesFiltrados.length)} de{" "}
          {clientesFiltrados.length} clientes
        </span>
        <div className="paginacao">
          <button
            disabled={pagina === 1}
            onClick={() => setPagina((p) => p - 1)}
          >
            ‹
          </button>
          <button
            disabled={pagina === totalPaginas || totalPaginas === 0}
            onClick={() => setPagina((p) => p + 1)}
          >
            ›
          </button>
        </div>
      </div>

      {modalAberto && (
        <Modal fechar={() => setModalAberto(false)}>
          <ClienteForm
            onSubmit={async (cliente) => {
              await adicionarCliente(cliente);
              setModalAberto(false);
            }}
          />
        </Modal>
      )}

      {clienteEditando && (
        <Modal fechar={() => setClienteEditando(null)}>
          <ClienteForm
            clienteInicial={clienteEditando}
            onSubmit={editarCliente}
          />
        </Modal>
      )}
    </div>
  );
}
