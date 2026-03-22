export default function ClienteAcao({ cliente }) {
  function gerarAcaoAutomatica() {
    alert(`(Função futura) Ação gerada para ${cliente.nome}`);
  }

  return (
    <div className="detalhe-acao">
      <button onClick={gerarAcaoAutomatica}>Executar Ação Automática</button>
    </div>
  );
}
