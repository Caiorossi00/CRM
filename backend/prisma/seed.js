import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.areaAtuacao.createMany({
    data: [
      { nome: 'Acidente' },
      { nome: 'PSDD' },
      { nome: 'Veículo não transferido' },
      { nome: 'Indicação de condutor' },
    ],
    skipDuplicates: true,
  });

  await prisma.tratativaStatus.createMany({
    data: [
      { nome: 'Qualificação inicial', cor: '#00BCD4' },
      { nome: 'Proposta', cor: '#6d03d1' },
      { nome: 'Contratação', cor: '#4d463a' },
      { nome: 'Fechado (advocacia)', cor: '#246e1d' },
      { nome: 'Fechado (consultoria)', cor: '#246e1d' },
      { nome: 'Oportunidade perdida', cor: '#f13a2d' },
      { nome: 'Encaminhado p/ parceria', cor: '#e7ce3f' },
    ],
    skipDuplicates: true,
  });

  await prisma.motivoNaoContratado.createMany({
    data: [
      { nome: 'Contratou outro(a)' },
      { nome: 'Receio de golpe' },
      { nome: 'Vai resolver sozinho(a)' },
      { nome: 'Problema resolvido' },
      { nome: 'Aceitou as consequências' },
      { nome: 'Não tem dinheiro' },
      { nome: 'Não respondeu' },
      { nome: 'Não enviou os arquivos' },
      { nome: 'Desqualificado' },
    ],
    skipDuplicates: true,
  });

  console.log('Seed concluído.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
