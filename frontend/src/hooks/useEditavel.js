import { useState, useEffect } from "react";

export default function useEditavelLista(valorInicial = [], onSave) {
  const [editando, setEditando] = useState(false);
  const [lista, setLista] = useState(valorInicial);

  useEffect(() => {
    setLista(valorInicial || []);
  }, [valorInicial]);

  function adicionar() {
    setLista((prev) => [...prev, { id: Date.now(), texto: "" }]);
  }

  function atualizar(id, texto) {
    setLista((prev) =>
      prev.map((item) => (item.id === id ? { ...item, texto } : item))
    );
  }

  function remover(id) {
    setLista((prev) => prev.filter((item) => item.id !== id));
  }

  function salvar() {
    const limpa = lista.filter(
      (item) => item.texto && item.texto.trim() !== ""
    );
    onSave && onSave(limpa);
    setEditando(false);
  }

  function cancelar() {
    setLista(valorInicial || []);
    setEditando(false);
  }

  return {
    editando,
    lista,
    setEditando,
    adicionar,
    atualizar,
    remover,
    salvar,
    cancelar,
  };
}
