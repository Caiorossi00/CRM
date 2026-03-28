export default function ClientePrimeiroContatoCard({
  primeiroContato,
  onChange,
}) {
  return (
    <div className="detalhe-card">
      <h2>Primeiro Contato</h2>

      <div className="detalhe-campo">
        <span className="detalhe-label">Data</span>
        <input
          type="date"
          value={primeiroContato || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
