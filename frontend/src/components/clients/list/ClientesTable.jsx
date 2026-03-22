import ClienteRow from "./ClienteRow";

export default function ClientesTable({
  clientes,
  onEditar,
  onExcluir,
  ordemContato,
  toggleOrdemContato,
}) {
  return (
    <table className="clientes-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Telefone</th>
          <th
            className="th-ordenavel"
            onClick={toggleOrdemContato}
            style={{ cursor: "pointer" }}
          >
            Último Contato{" "}
            {ordemContato === "asc" ? "↑" : ordemContato === "desc" ? "↓" : ""}
          </th>
          <th>Forma de Prospecção</th>
          <th>Área de Atuação</th>
          <th>Resumo da Demanda</th>
          <th>Resumo da Última Tratativa</th>
          <th>Motivo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((c) => (
          <ClienteRow
            key={c.id}
            cliente={c}
            onEditar={onEditar}
            onExcluir={onExcluir}
          />
        ))}
      </tbody>
    </table>
  );
}
