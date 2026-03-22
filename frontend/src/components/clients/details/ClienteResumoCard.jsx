export default function ClienteResumoCard({ titulo, texto }) {
  return (
    <div className="detalhe-card detalhe-card--full">
      <h2>{titulo}</h2>
      <p>{texto || "—"}</p>
    </div>
  );
}
