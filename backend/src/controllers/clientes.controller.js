import {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
} from '../services/clientes.service.js';

export async function listarClientes(req, res) {
  const clientes = await getAllClientes();
  res.json(clientes);
}

export async function buscarCliente(req, res) {
  const cliente = await getClienteById(req.params.id);

  if (!cliente) {
    return res.status(404).json({ erro: 'Cliente não encontrado' });
  }

  res.json(cliente);
}

export async function criarCliente(req, res) {
  const novoCliente = await createCliente(req.body);
  res.status(201).json(novoCliente);
}

export async function atualizarCliente(req, res) {
  const cliente = await updateCliente(req.params.id, req.body);

  if (!cliente) {
    return res.status(404).json({ erro: 'Cliente não encontrado' });
  }

  res.json(cliente);
}

export async function removerCliente(req, res) {
  await deleteCliente(req.params.id);
  res.status(204).end();
}
