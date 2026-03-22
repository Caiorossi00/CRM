import { useState, useMemo } from "react";
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
  const [ordemContato, setOrdemContato] = useState(null);

  const clientesFiltrados = clientes.filter((c) => {
    const passaBusca =
      c.nome?.toLowerCase().includes(busca.toLowerCase()) ||
      c.telefone?.includes(busca);
    const passaFiltro = Object.entries(filtros).every(
      ([campo, valores]) => valores.length === 0 || valores.includes(c[campo]),
    );
    return passaBusca && passaFiltro;
  });

  const clientesOrdenados = useMemo(() => {
    if (!ordemContato) return clientesFiltrados;
    return [...clientesFiltrados].sort((a, b) => {
      const dataA = new Date(a.ultimoContato);
      const dataB = new Date(b.ultimoContato);
      return ordemContato === "asc" ? dataA - dataB : dataB - dataA;
    });
  }, [clientesFiltrados, ordemContato]);

  const clientesPagina = clientesOrdenados.slice(
    (pagina - 1) * ITENS_POR_PAGINA,
    pagina * ITENS_POR_PAGINA,
  );

  function toggleOrdemContato() {
    setOrdemContato((prev) =>
      prev === "asc" ? "desc" : prev === "desc" ? null : "asc",
    );
  }

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
        ordemContato={ordemContato}
        toggleOrdemContato={toggleOrdemContato}
      />
      <ClientesFooter
        pagina={pagina}
        setPagina={setPagina}
        totalPaginas={Math.ceil(clientesOrdenados.length / ITENS_POR_PAGINA)}
        totalItens={clientesOrdenados.length}
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
