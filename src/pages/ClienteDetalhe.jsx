import { useParams, Link } from "react-router-dom";

export default function ClienteDetalhe() {
  const { id } = useParams();

  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  const cliente = clientes.find((c) => String(c.id) === id);

  if (!cliente) {
    return <h2>Cliente não encontrado</h2>;
  }

  return (
    <div>
      <h1>Detalhes do Cliente</h1>

      <p>
        <strong>Nome:</strong> {cliente.nome}
      </p>
      <p>
        <strong>Telefone:</strong> {cliente.telefone}
      </p>
      <p>
        <strong>Último contato:</strong> {cliente.ultimoContato}
      </p>
      <p>
        <strong>Forma de prospecção:</strong> {cliente.formaProspeccao}
      </p>
      <p>
        <strong>Área de atuação:</strong> {cliente.areaAtuacao}
      </p>

      <p>
        <strong>Resumo da demanda:</strong>
      </p>
      <p>{cliente.resumoDemanda}</p>

      <p>
        <strong>Resumo da última tratativa:</strong>
      </p>
      <p>{cliente.resumoUltimaTratativa}</p>

      <p>
        <strong>Motivo de não contratação:</strong>
      </p>
      <p>{cliente.motivoNaoContratado}</p>

      <Link to="/clientes">Voltar</Link>
    </div>
  );
}
