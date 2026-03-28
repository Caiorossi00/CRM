import useEditavel from "../../../hooks/useEditavel";

export default function ClienteExtrasCard({ valor, onSave }) {
  const {
    editando,
    valor: texto,
    setValor,
    setEditando,
    salvar,
    cancelar,
  } = useEditavel(valor, onSave);

  return (
    <div className="detalhe-card">
      <h2>Informações Extras</h2>

      {editando ? (
        <>
          <textarea value={texto} onChange={(e) => setValor(e.target.value)} />
          <button onClick={salvar}>Salvar</button>
          <button onClick={cancelar}>Cancelar</button>
        </>
      ) : (
        <>
          <p>{valor || "—"}</p>
          <button onClick={() => setEditando(true)}>Editar</button>
        </>
      )}
    </div>
  );
}
