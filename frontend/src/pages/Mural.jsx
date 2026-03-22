import { useState } from "react";
import "../assets/styles/Mural.scss";

export default function Mural() {
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState("");

  function handleAdicionarMensagem() {
    if (!novaMensagem.trim()) return;
    setMensagens([
      { texto: novaMensagem, id: Date.now(), lida: false },
      ...mensagens,
    ]);
    setNovaMensagem("");
  }

  function handleExcluirMensagem(id) {
    setMensagens(mensagens.filter((msg) => msg.id !== id));
  }

  function handleMarcarLida(id) {
    setMensagens(
      mensagens.map((msg) =>
        msg.id === id ? { ...msg, lida: !msg.lida } : msg,
      ),
    );
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") handleAdicionarMensagem();
  }

  return (
    <div className="mural-page">
      <h2>Mural de Mensagens</h2>
      <div className="mural-form">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={novaMensagem}
          onChange={(e) => setNovaMensagem(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleAdicionarMensagem}>Enviar</button>
      </div>
      <ul className="mural-lista">
        {mensagens.map((msg) => (
          <li key={msg.id} className={`mural-item ${msg.lida ? "lida" : ""}`}>
            <span>{msg.texto}</span>
            <div className="mural-actions">
              <button onClick={() => handleMarcarLida(msg.id)}>
                {msg.lida ? "Desmarcar" : "Marcar lida"}
              </button>
              <button onClick={() => handleExcluirMensagem(msg.id)}>
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
