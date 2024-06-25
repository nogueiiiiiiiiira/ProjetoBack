-- CreateTable
CREATE TABLE "Resposta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bibliotecario" TEXT NOT NULL,
    "leitor" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "assunto" TEXT NOT NULL,
    "telefoneLeitor" TEXT NOT NULL,
    "criadoEm" TEXT NOT NULL
);
