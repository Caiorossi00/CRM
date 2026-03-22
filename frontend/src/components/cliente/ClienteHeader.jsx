import { Link } from "react-router-dom";
import { formatarData } from "../../utils/dateUtils";

export default function ClienteHeader({ cliente }) {
  return (
    <div className="detalhe-header">
      <div>
        <h1>{cliente.nome}</h1>
        <p>Cadastrado em {formatarData(cliente.dataCadastro)}</p>
      </div>
      <Link to="/clientes" className="detalhe-voltar">
        ← Voltar
      </Link>
    </div>
  );
}
