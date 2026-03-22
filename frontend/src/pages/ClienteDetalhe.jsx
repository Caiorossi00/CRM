import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ClienteHeader from "../components/cliente/ClienteHeader";
import ClienteInfoCard from "../components/cliente/ClienteInfoCard";
import ClienteResumoCard from "../components/cliente/ClienteResumoCard";
import ClienteAcao from "../components/cliente/ClienteAcao";
import "../assets/styles/ClienteDetalhe.scss";

export default function ClienteDetalhe() {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/clientes/${id}`)
      .then((res) => res.json())
      .then((data) => setCliente(data));
  }, [id]);

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
