const FORMAS_PROSPECCAO = ["Indicação", "Instagram", "Youtube", "Networking"];
const AREAS_ATUACAO = [
  "Acidente",
  "PSDD",
  "Veículo não transferido",
  "Indicação de condutor",
];

function isDataValida(data) {
  if (!data) return true;
  const d = new Date(data);
  return !isNaN(d.getTime());
}

export default function validarCliente(req, res, next) {
  const {
    nome,
    telefone,
    primeiroContato,
    ultimoContato,
    formaProspeccao,
    areaAtuacao,
  } = req.body;

  if (!nome || nome.trim().length < 3) {
    return res.status(400).json({ erro: "Nome inválido" });
  }

  if (!telefone || /[a-zA-Z]/.test(telefone)) {
    return res.status(400).json({ erro: "Telefone inválido" });
  }

  const numeros = telefone.replace(/\D/g, "");

  if (numeros.length < 4) {
    return res.status(400).json({ erro: "Telefone inválido" });
  }

  if (!isDataValida(primeiroContato)) {
    return res.status(400).json({ erro: "Primeiro contato inválido" });
  }

  if (!isDataValida(ultimoContato)) {
    return res.status(400).json({ erro: "Último contato inválido" });
  }

  if (formaProspeccao && !FORMAS_PROSPECCAO.includes(formaProspeccao)) {
    return res.status(400).json({ erro: "Forma de prospecção inválida" });
  }

  if (areaAtuacao && !AREAS_ATUACAO.includes(areaAtuacao)) {
    return res.status(400).json({ erro: "Área de atuação inválida" });
  }

  next();
}
