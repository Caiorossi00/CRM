import { useState, useEffect } from "react";

export default function useEditavel(valorInicial, onSave) {
  const [editando, setEditando] = useState(false);
  const [valor, setValor] = useState(valorInicial || "");

  useEffect(() => {
    setValor(valorInicial || "");
  }, [valorInicial]);

  function salvar() {
    onSave && onSave(valor);
    setEditando(false);
  }

  function cancelar() {
    setValor(valorInicial || "");
    setEditando(false);
  }

  return {
    editando,
    valor,
    setValor,
    setEditando,
    salvar,
    cancelar,
  };
}
