-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "primeiroContato" DATETIME,
    "ultimoContato" DATETIME,
    "formaProspeccao" TEXT,
    "areaAtuacao" TEXT,
    "resumoDemanda" TEXT,
    "resumoUltimaTratativa" TEXT,
    "motivoNaoContratado" TEXT,
    "dataCadastro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
