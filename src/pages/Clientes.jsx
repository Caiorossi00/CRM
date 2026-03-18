import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import ClienteForm from "../components/ClienteForm";
import "../assets/styles/Clientes.scss";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("clientes")) || [];
    setClientes(dados);
  }, []);

  function adicionarCliente(cliente) {
    const novos = [...clientes, { ...cliente, id: Date.now() }];
    setClientes(novos);
    localStorage.setItem("clientes", JSON.stringify(novos));
  }

  function removerCliente(id) {
    const novos = clientes.filter((c) => c.id !== id);
    setClientes(novos);
    localStorage.setItem("clientes", JSON.stringify(novos));
  }

  return (
    <div>
      <h1>Clientes</h1>

      <button onClick={() => setModalAberto(true)}>Novo Cliente</button>

      <ul>
        {clientes.map((c) => (
          <li key={c.id}>
            <Link to={`/clientes/${c.id}`}>
              {c.nome} - {c.cpf}
            </Link>

            <button onClick={() => removerCliente(c.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      {modalAberto && (
        <Modal fechar={() => setModalAberto(false)}>
          <ClienteForm
            onSubmit={(cliente) => {
              adicionarCliente(cliente);
              setModalAberto(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
