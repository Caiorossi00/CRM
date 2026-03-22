import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ClienteHeader from "../components/clients/details/ClienteHeader";
import ClienteInfoCard from "../components/clients/details/ClienteInfoCard";
import ClienteResumoCard from "../components/clients/details/ClienteResumoCard";
import ClienteAcao from "../components/clients/details/ClienteAcao";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusPage from "../components/StatusPage";
import { getClienteById } from "../services/clientesService";
import "../assets/styles/ClienteDetalhe.scss";

export default function ClienteDetalhe() {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function carregarCliente() {
      try {
        setLoading(true);
        setError(null);
        const data = await getClienteById(id);
        setCliente(data);
      } catch (err) {
        setError(err.message);
        setCliente(null);
      } finally {
        setLoading(false);
      }
    }
    carregarCliente();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return <StatusPage mensagem={`Erro: ${error}`} voltar="/clientes" />;
  if (!cliente)
    return <StatusPage mensagem="Cliente não encontrado." voltar="/clientes" />;

  return (
    <div className="detalhe-page">
      <ClienteHeader cliente={cliente} />
      <div className="detalhe-grid">
        <ClienteInfoCard
          titulo="Informações de Contato"
          campos={[
            { label: "Telefone", valor: cliente.telefone },
            { label: "Último Contato", valor: cliente.ultimoContato },
          ]}
        />
        <ClienteInfoCard
          titulo="Prospecção"
          campos={[
            { label: "Forma de Prospecção", valor: cliente.formaProspeccao },
            { label: "Área de Atuação", valor: cliente.areaAtuacao },
          ]}
        />
      </div>
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
      <ClienteAcao cliente={cliente} />
    </div>
  );
}
