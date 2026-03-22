export const FORMAS_PROSPECCAO = [
  "Indicação",
  "Instagram",
  "Youtube",
  "Networking",
];

export const AREAS_ATUACAO = [
  "Acidente",
  "PSDD",
  "Veículo não transferido",
  "Indicação de condutor",
];

export const CAMPOS_INICIAIS = {
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

export const CAMPOS = [
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
];

export const TRATATIVAS = [
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

export const MOTIVOS = [
  "Contratou outro(a)",
  "Achou caro",
  "Receio de golpe",
  "Vai resolver sozinho(a)",
  "Problema resolvido",
  "Aceitou as consequências",
  "Não tem dinheiro",
  "Não respondeu",
  "Não enviou os arquivos",
  "Desqualificado",
];
