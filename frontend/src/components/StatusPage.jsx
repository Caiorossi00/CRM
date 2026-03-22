import { Link } from "react-router-dom";
import "../assets/styles/StatusPage.scss";

export default function StatusPage({ tipo, mensagem, voltar }) {
  return (
    <div className="status-page">
      <p className="status-page__mensagem">{mensagem}</p>
      {voltar && (
        <Link to={voltar} className="status-page__voltar">
          ← Voltar
        </Link>
      )}
    </div>
  );
}
