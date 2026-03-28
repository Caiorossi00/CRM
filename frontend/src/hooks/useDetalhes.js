import { useState, useEffect } from "react";
import { getClienteById } from "../services/clientesService";
import { getClienteDetalhesById } from "../services/clienteDetalhesService";

export default function useDetalhes(id) {
  const [cliente, setCliente] = useState(null);
  const [detalhes, setDetalhes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        setLoading(true);
        setError(null);
        const [clienteData, detalhesData] = await Promise.all([
          getClienteById(id),
          getClienteDetalhesById(id),
        ]);
        setCliente(clienteData);
        setDetalhes({
          ...detalhesData,
          documentos: (detalhesData.documentos || []).filter(
            (doc) => doc?.url && doc.url.trim() !== ""
          ),
        });
      } catch (err) {
        setError(err.message);
        setCliente(null);
        setDetalhes(null);
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, [id]);

  function updateDetalhes(campo, value) {
    setDetalhes((prev) => ({ ...prev, [campo]: value }));
  }

  function addDocumento(url) {
    if (!url || !url.trim()) return;

    setDetalhes((prev) => ({
      ...prev,
      documentos: [
        ...(prev.documentos || []),
        {
          id: Date.now(),
          url: url.trim(),
          tipo: "link",
        },
      ],
    }));
  }

  function removeDocumento(id) {
    setDetalhes((prev) => ({
      ...prev,
      documentos: (prev.documentos || []).filter((doc) => doc.id !== id),
    }));
  }

  return {
    cliente,
    detalhes,
    loading,
    error,
    updateDetalhes,
    addDocumento,
    removeDocumento,
  };
}
