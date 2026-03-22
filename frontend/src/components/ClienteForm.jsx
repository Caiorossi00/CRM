import { useState } from "react";
import "../assets/styles/ClienteForm.scss";
import {
  CAMPOS,
  CAMPOS_INICIAIS,
  TRATATIVAS,
  MOTIVOS,
} from "../assets/data/clienteData";

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
    if (campo.name === "resumoUltimaTratativa") {
      return (
        <div className="form-group">
          <label htmlFor={campo.name}>{campo.label}</label>
          <select
            id={campo.name}
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

    if (campo.name === "motivoNaoContratado") {
      return (
        <div className="form-group">
          <label htmlFor={campo.name}>{campo.label}</label>
          <select
            id={campo.name}
            name={campo.name}
            value={form[campo.name]}
            onChange={handleChange}
          >
            <option value="" disabled>
              Selecione
            </option>
            {MOTIVOS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (campo.type === "select") {
      return (
        <div className="form-group">
          <label htmlFor={campo.name}>{campo.label}</label>
          <select
            id={campo.name}
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
          <label htmlFor={campo.name}>{campo.label}</label>
          <textarea
            id={campo.name}
            name={campo.name}
            value={form[campo.name]}
            onChange={handleChange}
          />
        </div>
      );
    }

    return (
      <div className="form-group">
        <label htmlFor={campo.name}>{campo.label}</label>
        <input
          id={campo.name}
          type={campo.type}
          name={campo.name}
          value={form[campo.name]}
          onChange={handleChange}
          required={campo.required}
        />
      </div>
    );
  }

  const camposParaRender = CAMPOS.concat([
    {
      name: "resumoUltimaTratativa",
      label: "Resumo da Última Tratativa",
      type: "select",
    },
    {
      name: "motivoNaoContratado",
      label: "Motivo de não contratação",
      type: "select",
    },
  ]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdicao ? "Editar Cliente" : "Novo Cliente"}</h2>
      {error && <p className="form-error">{error}</p>}
      {camposParaRender.map((campo) => (
        <div key={campo.name}>{renderCampo(campo)}</div>
      ))}
      <button type="submit" disabled={loading}>
        {loading ? "Salvando..." : isEdicao ? "Atualizar" : "Salvar"}
      </button>
    </form>
  );
}
