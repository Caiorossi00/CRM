import { useEffect, useState } from "react";

export default function useClientes() {
  const [clientes, setClientes] = useState([]);

  async function buscarClientes() {
    const res = await fetch("http://localhost:3000/clientes");
    const data = await res.json();
    setClientes(data);
  }

  async function adicionarCliente(cliente) {
    await fetch("http://localhost:3000/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    });
    await buscarClientes();
  }

  async function editarCliente(cliente) {
    await fetch(`http://localhost:3000/clientes/${cliente.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    });
    await buscarClientes();
  }

  async function removerCliente(id) {
    await fetch(`http://localhost:3000/clientes/${id}`, {
      method: "DELETE",
    });
    await buscarClientes();
  }

  useEffect(() => {
    buscarClientes();
  }, []);

  return {
    clientes,
    buscarClientes,
    adicionarCliente,
    editarCliente,
    removerCliente,
  };
}
