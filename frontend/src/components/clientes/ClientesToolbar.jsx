export default function ClientesToolbar({ busca, setBusca, abrirModal }) {
  function handleBusca(e) {
    setBusca(e.target.value);
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
      </div>
    </div>
  );
}
