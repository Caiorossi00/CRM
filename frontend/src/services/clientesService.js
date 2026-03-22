import { request } from "./api";

export function getClientes() {
  return request("/clientes");
}

export function getClienteById(id) {
  return request(`/clientes/${id}`);
}

export function criarCliente(cliente) {
  return request("/clientes", {
    method: "POST",
    body: JSON.stringify(cliente),
  });
}

export function atualizarCliente(cliente) {
  return request(`/clientes/${cliente.id}`, {
    method: "PUT",
    body: JSON.stringify(cliente),
  });
}

export function deletarCliente(id) {
  return request(`/clientes/${id}`, {
    method: "DELETE",
  });
}
