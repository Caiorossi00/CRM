/*
  Warnings:

  - You are about to drop the column `areaAtuacao` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Documento` table. All the data in the column will be lost.
  - You are about to drop the `Contato` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Nota` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `titulo` to the `Documento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contato" DROP CONSTRAINT "Contato_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "Nota" DROP CONSTRAINT "Nota_clienteId_fkey";

-- DropIndex
DROP INDEX "Cliente_dataCadastro_idx";

-- DropIndex
DROP INDEX "Cliente_nome_idx";

-- DropIndex
DROP INDEX "Documento_clienteId_idx";

-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "areaAtuacao",
ADD COLUMN     "areaAtuacaoId" INTEGER,
ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "observacoes" TEXT,
ADD COLUMN     "rg" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Qualificação';

-- AlterTable
ALTER TABLE "Documento" DROP COLUMN "nome",
ADD COLUMN     "titulo" TEXT NOT NULL;

-- DropTable
DROP TABLE "Contato";

-- DropTable
DROP TABLE "Nota";

-- CreateTable
CREATE TABLE "AreaAtuacao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "AreaAtuacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atendimento" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descricao" TEXT NOT NULL,
    "tipo" TEXT,

    CONSTRAINT "Atendimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FollowUp" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "dataAgendada" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "concluido" BOOLEAN NOT NULL DEFAULT false,
    "tentativaMaxima" INTEGER NOT NULL DEFAULT 3,
    "tentativaAtual" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FollowUp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChecklistItem" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "areaAtuacaoId" INTEGER,
    "descricao" TEXT NOT NULL,
    "marcado" BOOLEAN NOT NULL DEFAULT false,
    "marcadoEm" TIMESTAMP(3),

    CONSTRAINT "ChecklistItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AreaAtuacao_nome_key" ON "AreaAtuacao"("nome");

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_areaAtuacaoId_fkey" FOREIGN KEY ("areaAtuacaoId") REFERENCES "AreaAtuacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowUp" ADD CONSTRAINT "FollowUp_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistItem" ADD CONSTRAINT "ChecklistItem_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistItem" ADD CONSTRAINT "ChecklistItem_areaAtuacaoId_fkey" FOREIGN KEY ("areaAtuacaoId") REFERENCES "AreaAtuacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;
