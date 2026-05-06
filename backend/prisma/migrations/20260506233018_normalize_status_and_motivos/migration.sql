/*
  Warnings:

  - You are about to drop the column `motivoNaoContratado` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Cliente` table. All the data in the column will be lost.
  - Added the required column `atualizadoEm` to the `AreaAtuacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atualizadoEm` to the `Atendimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atualizadoEm` to the `ChecklistItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atualizadoEm` to the `Documento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atualizadoEm` to the `FollowUp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AreaAtuacao" ADD COLUMN     "atualizadoEm" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Atendimento" ADD COLUMN     "atualizadoEm" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ChecklistItem" ADD COLUMN     "atualizadoEm" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "motivoNaoContratado",
DROP COLUMN "status",
ADD COLUMN     "atualizadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "motivoNaoContratadoId" INTEGER,
ADD COLUMN     "statusId" INTEGER;

-- AlterTable
ALTER TABLE "Documento" ADD COLUMN     "atualizadoEm" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tipo" TEXT;

-- AlterTable
ALTER TABLE "FollowUp" ADD COLUMN     "atualizadoEm" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "TratativaStatus" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cor" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TratativaStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotivoNaoContratado" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MotivoNaoContratado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TratativaStatus_nome_key" ON "TratativaStatus"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "MotivoNaoContratado_nome_key" ON "MotivoNaoContratado"("nome");

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "TratativaStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_motivoNaoContratadoId_fkey" FOREIGN KEY ("motivoNaoContratadoId") REFERENCES "MotivoNaoContratado"("id") ON DELETE SET NULL ON UPDATE CASCADE;
