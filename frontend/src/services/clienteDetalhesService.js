import clienteDetalhesMock from "../assets/data/clienteDetalhesMock.json";

export async function getClienteDetalhesById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(clienteDetalhesMock);
    }, 300);
  });
}
