import prisma from '../lib/prisma.js';

function parseDate(date) {
  if (!date) return null;
  const parsed = new Date(date);
  return isNaN(parsed.getTime()) ? null : parsed;
}

export async function getAllClientes() {
  return prisma.cliente.findMany({
    orderBy: { id: 'desc' },
  });
}

export async function getClienteById(id) {
  return prisma.cliente.findUnique({
    where: { id: Number(id) },
  });
}

export async function createCliente(data) {
  return prisma.cliente.create({
    data: {
      ...data,
      primeiroContato: parseDate(data.primeiroContato),
      ultimoContato: parseDate(data.ultimoContato),
    },
  });
}

export async function updateCliente(id, data) {
  try {
    return await prisma.cliente.update({
      where: { id: Number(id) },
      data: {
        ...data,
        primeiroContato: parseDate(data.primeiroContato),
        ultimoContato: parseDate(data.ultimoContato),
      },
    });
  } catch {
    return null;
  }
}

export async function deleteCliente(id) {
  await prisma.cliente.delete({
    where: { id: Number(id) },
  });
}
