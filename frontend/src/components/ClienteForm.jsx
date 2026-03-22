import { useState } from "react";
import "../assets/styles/ClienteForm.scss";

const FORMAS_PROSPECCAO = ["Indicação", "Instagram", "Youtube", "Networking"];
const AREAS_ATUACAO = [
  "Acidente",
  "PSDD",
  "Veículo não transferido",
  "Indicação de condutor",
];

const CAMPOS_INICIAIS = {
  nome: "",
  telefone: "",
  primeiroContato: "",
  ultimoContato: "",
  formaProspeccao: "",
  areaAtuacao: "",
  resumoDemanda: "",
  resumoUltimaTratativa: "",
  motivoNaoContratado: "",
};

export default function ClienteForm({ onSubmit, clienteInicial }) {
  const [form, setForm] = useState(
    clienteInicial
      ? { ...CAMPOS_INICIAIS, ...clienteInicial }
      : CAMPOS_INICIAIS,
  );

  const isEdicao = Boolean(clienteInicial);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.nome || !form.telefone) return;
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdicao ? "Editar Cliente" : "Novo Cliente"}</h2>
      <input
        type="text"
        name="nome"
        placeholder="Nome completo"
        value={form.nome}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="telefone"
        placeholder="Telefone/WhatsApp"
        value={form.telefone}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="ultimoContato"
        value={form.ultimoContato}
        onChange={handleChange}
      />
      <select
        name="formaProspeccao"
        value={form.formaProspeccao}
        onChange={handleChange}
      >
        <option value="">Forma de prospecção</option>
        {FORMAS_PROSPECCAO.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>
      <select
        name="areaAtuacao"
        value={form.areaAtuacao}
        onChange={handleChange}
      >
        <option value="">Área de atuação</option>
        {AREAS_ATUACAO.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
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
        placeholder="Se não contratou, qual o motivo?"
        value={form.motivoNaoContratado}
        onChange={handleChange}
      />
      <button type="submit">{isEdicao ? "Atualizar" : "Salvar"}</button>
    </form>
  );
}
