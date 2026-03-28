import { useState } from "react";
import "../../../assets/styles/ClienteDocumentosCard.scss";

export default function ClienteDocumentosCard({ documentos, onAdd, onRemove }) {
  const [url, setUrl] = useState("");

  function handleAdd() {
    if (!url || !url.trim()) return;
    onAdd(url.trim());
    setUrl("");
  }

  return (
    <div className="detalhe-card">
      <h2>Documentos</h2>

      <div className="documentos-input">
        <input
          type="text"
          placeholder="Cole o link do documento"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={handleAdd}>Adicionar</button>
      </div>

      <div className="documentos-lista">
        {(documentos || [])
          .filter((doc) => doc?.url && doc.url.trim() !== "")
          .map((doc) => (
            <div key={doc.id} className="documento-item">
              <a href={doc.url} target="_blank" rel="noopener noreferrer">
                {doc.url}
              </a>

              <button
                className="documento-remover"
                onClick={() => onRemove(doc.id)}
              >
                x
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
