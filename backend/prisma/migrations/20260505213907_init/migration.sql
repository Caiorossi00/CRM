-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "primeiroContato" TIMESTAMP(3),
    "ultimoContato" TIMESTAMP(3),
    "formaProspeccao" TEXT,
    "areaAtuacao" TEXT,
    "resumoDemanda" TEXT,
    "resumoUltimaTratativa" TEXT,
    "motivoNaoContratado" TEXT,
    "dataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);
