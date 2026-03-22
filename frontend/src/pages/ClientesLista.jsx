import { useState } from "react";
import Modal from "../components/Modal";
import ClienteForm from "../components/ClienteForm";
import ClientesHeader from "../components/clients/list/ClientesHeader";
import ClientesToolbar from "../components/clients/list/ClientesToolbar";
import ClientesTable from "../components/clients/list/ClientesTable";
import ClientesFooter from "../components/clients/list/ClientesFooter";
import useClientes from "../hooks/useClientes";
import "../assets/styles/Clientes.scss";

const ITENS_POR_PAGINA = 10;

export default function Clientes() {
  const { clientes, adicionarCliente, editarCliente, removerCliente } =
    useClientes();
  const [busca, setBusca] = useState("");
  const [filtros, setFiltros] = useState({});
  const [pagina, setPagina] = useState(1);
  const [modalAberto, setModalAberto] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

  const clientesFiltrados = clientes.filter((c) => {
    const passaBusca =
      c.nome?.toLowerCase().includes(busca.toLowerCase()) ||
      c.telefone?.includes(busca);

    const passaFiltro = Object.entries(filtros).every(
      ([campo, valores]) => valores.length === 0 || valores.includes(c[campo]),
    );

    return passaBusca && passaFiltro;
  });

  const totalPaginas = Math.ceil(clientesFiltrados.length / ITENS_POR_PAGINA);
  const clientesPagina = clientesFiltrados.slice(
    (pagina - 1) * ITENS_POR_PAGINA,
    pagina * ITENS_POR_PAGINA,
  );

  return (
    <div className="clientes-page">
      <ClientesHeader />
      <ClientesToolbar
        busca={busca}
        setBusca={setBusca}
        abrirModal={() => setModalAberto(true)}
        filtros={filtros}
        setFiltros={setFiltros}
      />
      <ClientesTable
        clientes={clientesPagina}
        onEditar={(c) => setClienteEditando(c)}
        onExcluir={removerCliente}
      />
      <ClientesFooter
        pagina={pagina}
        setPagina={setPagina}
        totalPaginas={totalPaginas}
        totalItens={clientesFiltrados.length}
      />
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
            onSubmit={async (cliente) => {
              await editarCliente(cliente);
              setClienteEditando(null);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
