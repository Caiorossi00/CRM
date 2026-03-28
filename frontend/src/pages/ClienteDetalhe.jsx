import { useParams } from "react-router-dom";
import ClienteHeader from "../components/clients/details/ClienteHeader";
import ClienteInfoCard from "../components/clients/details/ClienteInfoCard";
import ClienteResumoCard from "../components/clients/details/ClienteResumoCard";
import ClienteDocumentosCard from "../components/clients/details/ClienteDocumentosCard";
import ClienteExtrasCard from "../components/clients/details/ClienteExtrasCard";
import ClientePrimeiroContatoCard from "../components/clients/details/ClientePrimeiroContatoCard";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusPage from "../components/StatusPage";
import useDetalhes from "../hooks/useDetalhes";
import "../assets/styles/ClienteDetalhe.scss";

export default function ClienteDetalhe() {
  const { id } = useParams();
  const {
    cliente,
    detalhes,
    loading,
    error,
    updateDetalhes,
    addDocumento,
    removeDocumento,
  } = useDetalhes(id);

  if (loading) return <LoadingSpinner />;
  if (error)
    return <StatusPage mensagem={`Erro: ${error}`} voltar="/clientes" />;
  if (!cliente)
    return <StatusPage mensagem="Cliente não encontrado." voltar="/clientes" />;

  return (
    <div className="detalhe-page">
      <ClienteHeader cliente={cliente} />

      <div className="detalhe-bento">
        <ClienteInfoCard
          titulo="Informações de Contato"
          campos={[
            { label: "Telefone", valor: cliente.telefone },
            { label: "Último Contato", valor: cliente.ultimoContato },
          ]}
        />

        <ClienteResumoCard
          titulo="Resumo da Demanda"
          texto={cliente.resumoDemanda}
        />

        <ClienteResumoCard
          titulo="Resumo da Última Tratativa"
          texto={cliente.resumoUltimaTratativa}
        />

        {cliente.motivoNaoContratado && (
          <ClienteResumoCard
            titulo="Motivo de Não Contratação"
            texto={cliente.motivoNaoContratado}
          />
        )}

        <ClienteInfoCard
          titulo="Prospecção"
          campos={[
            { label: "Forma de Prospecção", valor: cliente.formaProspeccao },
            { label: "Área de Atuação", valor: cliente.areaAtuacao },
          ]}
        />

        {detalhes && (
          <>
            <ClientePrimeiroContatoCard
              primeiroContato={
                detalhes.primeiroContato || cliente.primeiroContato
              }
              onChange={(val) => updateDetalhes("primeiroContato", val)}
            />

            <div className="bento-2">
              <ClienteExtrasCard
                valor={detalhes.informacoesExtras}
                onSave={(val) => updateDetalhes("informacoesExtras", val)}
              />
            </div>

            <div className="bento-2">
              <ClienteDocumentosCard
                documentos={detalhes.documentos || []}
                onAdd={addDocumento}
                onRemove={removeDocumento}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
