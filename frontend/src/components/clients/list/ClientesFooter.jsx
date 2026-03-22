export default function ClientesFooter({
  pagina,
  setPagina,
  totalPaginas,
  totalItens,
}) {
  return (
    <div className="clientes-footer">
      <span>
        Página {pagina} de {totalPaginas} — {totalItens} clientes
      </span>

      <div className="paginacao">
        <button disabled={pagina === 1} onClick={() => setPagina((p) => p - 1)}>
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
  );
}
