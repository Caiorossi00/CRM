import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "../data/clientes.json");

function lerClientes() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

function salvarClientes(clientes) {
  fs.writeFileSync(dataPath, JSON.stringify(clientes, null, 2));
}

export function getAllClientes() {
  return lerClientes();
}

export function getClienteById(id) {
  const clientes = lerClientes();
  return clientes.find((c) => c.id === Number(id));
}

export function createCliente(data) {
  const clientes = lerClientes();

  const novoCliente = {
    id: Date.now(),
    ...data,
    dataCadastro: new Date().toISOString(),
  };

  clientes.push(novoCliente);
  salvarClientes(clientes);

  return novoCliente;
}

export function updateCliente(id, data) {
  const clientes = lerClientes();
  const index = clientes.findIndex((c) => c.id === Number(id));
  if (index === -1) return null;

  const { id: _id, dataCadastro: _dataCadastro, ...dadosPermitidos } = data;

  clientes[index] = {
    ...clientes[index],
    ...dadosPermitidos,
  };
  salvarClientes(clientes);
  return clientes[index];
}

export function deleteCliente(id) {
  const clientes = lerClientes();
  const novosClientes = clientes.filter((c) => c.id !== Number(id));

  salvarClientes(novosClientes);

  return true;
}
