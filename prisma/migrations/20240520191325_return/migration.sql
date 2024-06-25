-- CreateTable
CREATE TABLE "Return" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idLivro" TEXT NOT NULL,
    "prevDev" DATETIME NOT NULL,
    "dataAtual" DATETIME NOT NULL,
    "multaAtribuida" TEXT NOT NULL
);
