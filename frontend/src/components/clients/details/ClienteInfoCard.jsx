import { formatarData } from "../../../utils/dateUtils";

export default function ClienteInfoCard({ titulo, campos }) {
  return (
    <div className="detalhe-card">
      <h2>{titulo}</h2>
      {campos.map((campo, index) => (
        <div className="detalhe-campo" key={index}>
          <span className="detalhe-label">{campo.label}</span>
          <span>
            {campo.label.includes("Contato")
              ? formatarData(campo.valor)
              : campo.valor || "—"}
          </span>
        </div>
      ))}
    </div>
  );
}
