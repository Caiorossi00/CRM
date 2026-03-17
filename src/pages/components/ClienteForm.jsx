import { useState } from "react";

export default function ClienteForm({ onSubmit }) {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    ultimoContato: "",
    formaProspeccao: "",
    areaAtuacao: "",
    resumoDemanda: "",
    resumoUltimaTratativa: "",
    motivoNaoContratado: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.nome || !form.telefone) return;

    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Novo Cliente</h2>

      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={form.nome}
        onChange={handleChange}
      />

      <input
        type="text"
        name="telefone"
        placeholder="Telefone"
        value={form.telefone}
        onChange={handleChange}
      />

      <input
        type="date"
        name="ultimoContato"
        value={form.ultimoContato}
        onChange={handleChange}
      />

      <input
        type="text"
        name="formaProspeccao"
        placeholder="Forma de prospecção"
        value={form.formaProspeccao}
        onChange={handleChange}
      />

      <input
        type="text"
        name="areaAtuacao"
        placeholder="Área de atuação"
        value={form.areaAtuacao}
        onChange={handleChange}
      />

      <textarea
        name="resumoDemanda"
        placeholder="Resumo da demanda"
        value={form.resumoDemanda}
        onChange={handleChange}
      />

      <textarea
        name="resumoUltimaTratativa"
        placeholder="Resumo da última tratativa"
        value={form.resumoUltimaTratativa}
        onChange={handleChange}
      />

      <textarea
        name="motivoNaoContratado"
        placeholder="Se não contratado, qual o motivo?"
        value={form.motivoNaoContratado}
        onChange={handleChange}
      />

      <button type="submit">Salvar</button>
    </form>
  );
}
