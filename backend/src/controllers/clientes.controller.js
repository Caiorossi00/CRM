import {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
} from "../services/clientes.service.js";

export function listarClientes(req, res) {
  const clientes = getAllClientes();
  res.json(clientes);
}

export function buscarCliente(req, res) {
  const cliente = getClienteById(req.params.id);

  if (!cliente) {
    return res.status(404).json({ erro: "Cliente não encontrado" });
  }

  res.json(cliente);
}

export function criarCliente(req, res) {
  const novoCliente = createCliente(req.body);
  res.status(201).json(novoCliente);
}

export function atualizarCliente(req, res) {
  const cliente = updateCliente(req.params.id, req.body);

  if (!cliente) {
    return res.status(404).json({ erro: "Cliente não encontrado" });
  }

  res.json(cliente);
}

export function removerCliente(req, res) {
  deleteCliente(req.params.id);
  res.status(204).end();
}
