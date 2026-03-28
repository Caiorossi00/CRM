import useEditavelLista from "../../../hooks/useEditavel";
import "../../../assets/styles/ClienteExtrasCard.scss";

export default function ClienteExtrasCard({ valor = [], onSave }) {
  const {
    editando,
    lista,
    setEditando,
    adicionar,
    atualizar,
    remover,
    salvar,
    cancelar,
  } = useEditavelLista(valor, onSave);

  return (
    <div className="detalhe-card">
      <div className="detalhe-header-inline">
        <h2>Informações Extras</h2>
        {!editando && <button onClick={() => setEditando(true)}>Editar</button>}
      </div>

      {editando ? (
        <>
          <div className="extras-lista">
            {lista.map((item) => (
              <div key={item.id} className="extra-item">
                <input
                  type="text"
                  value={item.texto}
                  onChange={(e) => atualizar(item.id, e.target.value)}
                />
                <button onClick={() => remover(item.id)}>x</button>
              </div>
            ))}
          </div>

          <button className="extra-add" onClick={adicionar}>
            + Adicionar
          </button>

          <div className="extra-actions">
            <button onClick={salvar}>Salvar</button>
            <button onClick={cancelar}>Cancelar</button>
          </div>
        </>
      ) : (
        <>
          {lista.length > 0 ? (
            <ul className="extras-view">
              {lista.map((item) => (
                <li key={item.id}>{item.texto}</li>
              ))}
            </ul>
          ) : (
            <p></p>
          )}
        </>
      )}
    </div>
  );
}
