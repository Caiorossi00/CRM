import { useParams, Link } from "react-router-dom";
import "../assets/styles/ClienteDetalhe.scss";
import { formatarData } from "../utils/dateUtils";

export default function ClienteDetalhe() {
  const { id } = useParams();
  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  const cliente = clientes.find((c) => String(c.id) === id);

  if (!cliente) {
    return (
      <div className="detalhe-page">
        <p className="detalhe-nao-encontrado">Cliente não encontrado.</p>
        <Link to="/clientes" className="detalhe-voltar">
          ← Voltar
        </Link>
      </div>
    );
  }

  function gerarAcaoAutomatica() {
    alert(`(Função futura) Ação gerada para ${cliente.nome}`);
  }

  return (
    <div className="detalhe-page">
      <div className="detalhe-header">
        <div>
          <h1>{cliente.nome}</h1>
          <p>Cadastrado em {formatarData(cliente.dataCadastro)}</p>
        </div>
        <Link to="/clientes" className="detalhe-voltar">
          ← Voltar
        </Link>
      </div>

      <div className="detalhe-grid">
        <div className="detalhe-card">
          <h2>Informações de Contato</h2>
          <div className="detalhe-campo">
            <span className="detalhe-label">Telefone</span>
            <span>{cliente.telefone || "—"}</span>
          </div>
          <div className="detalhe-campo">
            <span className="detalhe-label">Último Contato</span>
            <span>{formatarData(cliente.ultimoContato)}</span>
          </div>
        </div>

        <div className="detalhe-card">
          <h2>Prospecção</h2>
          <div className="detalhe-campo">
            <span className="detalhe-label">Forma de Prospecção</span>
            <span>{cliente.formaProspeccao || "—"}</span>
          </div>
          <div className="detalhe-campo">
            <span className="detalhe-label">Área de Atuação</span>
            <span>{cliente.areaAtuacao || "—"}</span>
          </div>
        </div>
      </div>

      <div className="detalhe-card detalhe-card--full">
        <h2>Resumo da Demanda</h2>
        <p>{cliente.resumoDemanda || "—"}</p>
      </div>

      <div className="detalhe-card detalhe-card--full">
        <h2>Resumo da Última Tratativa</h2>
        <p>{cliente.resumoUltimaTratativa || "—"}</p>
      </div>

      {cliente.motivoNaoContratado && (
        <div className="detalhe-card detalhe-card--full">
          <h2>Motivo de Não Contratação</h2>
          <p>{cliente.motivoNaoContratado}</p>
        </div>
      )}

      <div className="detalhe-acao">
        <button onClick={gerarAcaoAutomatica}>Executar Ação Automática</button>
      </div>
    </div>
  );
}
