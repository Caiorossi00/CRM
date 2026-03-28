import "../../../assets/styles/ClienteResumoCard.scss";

export default function ClienteResumoCard({ titulo, texto }) {
  return (
    <div className="resumo-card">
      <h3>{titulo}</h3>
      <p>{texto || "—"}</p>
    </div>
  );
}
