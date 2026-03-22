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

const CAMPOS = [
  { name: "nome", type: "text", placeholder: "Nome completo", required: true },
  {
    name: "telefone",
    type: "text",
    placeholder: "Telefone/WhatsApp",
    required: true,
  },
  { name: "ultimoContato", type: "date" },
  {
    name: "formaProspeccao",
    type: "select",
    options: FORMAS_PROSPECCAO,
    placeholder: "Forma de prospecção",
  },
  {
    name: "areaAtuacao",
    type: "select",
    options: AREAS_ATUACAO,
    placeholder: "Área de atuação",
  },
  {
    name: "resumoDemanda",
    type: "textarea",
    placeholder: "Resumo da demanda",
  },
  {
    name: "resumoUltimaTratativa",
    type: "textarea",
    placeholder: "Resumo da última tratativa",
  },
  {
    name: "motivoNaoContratado",
    type: "textarea",
    placeholder: "Se não contratou, qual o motivo?",
  },
];

export default function ClienteForm({ onSubmit, clienteInicial }) {
  const [form, setForm] = useState(
    clienteInicial
      ? { ...CAMPOS_INICIAIS, ...clienteInicial }
      : CAMPOS_INICIAIS,
  );

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isEdicao = Boolean(clienteInicial);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.nome || !form.telefone) return;

    try {
      setLoading(true);
      setError(null);

      await onSubmit(form);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function renderCampo(campo) {
    if (campo.type === "select") {
      return (
        <select
          name={campo.name}
          value={form[campo.name]}
          onChange={handleChange}
        >
          <option value="">{campo.placeholder}</option>
          {campo.options.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
      );
    }

    if (campo.type === "textarea") {
      return (
        <textarea
          name={campo.name}
          placeholder={campo.placeholder}
          value={form[campo.name]}
          onChange={handleChange}
        />
      );
    }

    return (
      <input
        type={campo.type}
        name={campo.name}
        placeholder={campo.placeholder}
        value={form[campo.name]}
        onChange={handleChange}
        required={campo.required}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdicao ? "Editar Cliente" : "Novo Cliente"}</h2>

      {error && <p className="form-error">{error}</p>}

      {CAMPOS.map((campo) => (
        <div key={campo.name}>{renderCampo(campo)}</div>
      ))}

      <button type="submit" disabled={loading}>
        {loading ? "Salvando..." : isEdicao ? "Atualizar" : "Salvar"}
      </button>
    </form>
  );
}
