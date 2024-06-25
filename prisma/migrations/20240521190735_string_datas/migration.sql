/*
  Warnings:

  - You are about to drop the column `valor` on the `Book` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Historic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "acao" TEXT NOT NULL,
    "criadoEm" TEXT NOT NULL
);
INSERT INTO "new_Historic" ("acao", "criadoEm", "id") SELECT "acao", "criadoEm", "id" FROM "Historic";
DROP TABLE "Historic";
ALTER TABLE "new_Historic" RENAME TO "Historic";
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "estoque" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL
);
INSERT INTO "new_Book" ("autor", "categoria", "criadoEm", "descricao", "estoque", "id", "nome") SELECT "autor", "categoria", "criadoEm", "descricao", "estoque", "id", "nome" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE TABLE "new_Reader" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "dataNasc" TEXT NOT NULL,
    "criadoEm" TEXT NOT NULL
);
INSERT INTO "new_Reader" ("cpf", "criadoEm", "dataNasc", "email", "id", "nome", "telefone") SELECT "cpf", "criadoEm", "dataNasc", "email", "id", "nome", "telefone" FROM "Reader";
DROP TABLE "Reader";
ALTER TABLE "new_Reader" RENAME TO "Reader";
PRAGMA foreign_key_check("Historic");
PRAGMA foreign_key_check("Book");
PRAGMA foreign_key_check("Reader");
PRAGMA foreign_keys=ON;
