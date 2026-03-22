import { useEffect, useState } from "react";
import {
  getClientes,
  criarCliente,
  atualizarCliente,
  deletarCliente,
} from "../services/clientesService";

export default function useClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function buscarClientes() {
    try {
      setLoading(true);
      setError(null);

      const data = await getClientes();
      setClientes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function adicionarCliente(cliente) {
    await criarCliente(cliente);
    await buscarClientes();
  }

  async function editarCliente(cliente) {
    await atualizarCliente(cliente);
    await buscarClientes();
  }

  async function removerCliente(id) {
    await deletarCliente(id);
    await buscarClientes();
  }

  useEffect(() => {
    buscarClientes();
  }, []);

  return {
    clientes,
    loading,
    error,
    adicionarCliente,
    editarCliente,
    removerCliente,
  };
}
