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
  { name: "nome", label: "Nome", type: "text", required: true },
  {
    name: "telefone",
    label: "Telefone/WhatsApp",
    type: "text",
    required: true,
  },
  { name: "ultimoContato", label: "Último contato", type: "date" },
  {
    name: "formaProspeccao",
    label: "Forma de prospecção",
    type: "select",
    options: FORMAS_PROSPECCAO,
  },
  {
    name: "areaAtuacao",
    label: "Área de atuação",
    type: "select",
    options: AREAS_ATUACAO,
  },
  { name: "resumoDemanda", label: "Resumo da demanda", type: "textarea" },
  {
    name: "motivoNaoContratado",
    label: "Motivo de não contratação",
    type: "textarea",
  },
];

const TRATATIVAS = [
  {
    label: "Qualificação inicial",
    value: "Qualificação",
    className: "tratativa-qualificacao",
  },
  { label: "Proposta", value: "Proposta", className: "tratativa-proposta" },
  {
    label: "Contratação",
    value: "Contratacao",
    className: "tratativa-contratacao",
  },
  {
    label: "Fechado (Advocacia)",
    value: "Fechado (advocacia)",
    className: "tratativa-fechado-advocacia",
  },
  {
    label: "Fechado (Consultoria)",
    value: "Fechado (consultoria)",
    className: "tratativa-fechado-consultoria",
  },
  {
    label: "Oportunidade perdida",
    value: "Oportunidade Perdida",
    className: "tratativa-oportunidade-perdida",
  },
  {
    label: "Encaminhado p/ parceria",
    value: "Encaminhado p/ Parceria",
    className: "tratativa-encaminhado-parceria",
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
    const id = campo.name;

    if (campo.name === "resumoUltimaTratativa") {
      return (
        <div className="form-group">
          <label htmlFor={id}>{campo.label}</label>
          <select
            id={id}
            name={campo.name}
            value={form[campo.name]}
            onChange={handleChange}
          >
            <option value="" disabled>
              Selecione
            </option>
            {TRATATIVAS.map((t) => (
              <option key={t.value} value={t.value} className={t.className}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (campo.type === "select") {
      return (
        <div className="form-group">
          <label htmlFor={id}>{campo.label}</label>
          <select
            id={id}
            name={campo.name}
            value={form[campo.name]}
            onChange={handleChange}
          >
            <option value="" disabled>
              Selecione
            </option>
            {campo.options.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (campo.type === "textarea") {
      return (
        <div className="form-group">
          <label htmlFor={id}>{campo.label}</label>
          <textarea
            id={id}
            name={campo.name}
            value={form[campo.name]}
            onChange={handleChange}
          />
        </div>
      );
    }

    return (
      <div className="form-group">
        <label htmlFor={id}>{campo.label}</label>
        <input
          id={id}
          type={campo.type}
          name={campo.name}
          value={form[campo.name]}
          onChange={handleChange}
          required={campo.required}
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdicao ? "Editar Cliente" : "Novo Cliente"}</h2>
      {error && <p className="form-error">{error}</p>}
      {CAMPOS.concat({
        name: "resumoUltimaTratativa",
        label: "Resumo da Última Tratativa",
        type: "select",
      }).map((campo) => (
        <div key={campo.name}>{renderCampo(campo)}</div>
      ))}
      <button type="submit" disabled={loading}>
        {loading ? "Salvando..." : isEdicao ? "Atualizar" : "Salvar"}
      </button>
    </form>
  );
}
