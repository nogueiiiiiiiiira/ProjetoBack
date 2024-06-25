/*
  Warnings:

  - Added the required column `criadoEm` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `criadoEm` to the `Reader` table without a default value. This is not possible if the table is not empty.
  - Added the required column `criadoEm` to the `Librarian` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Fine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "idLivro" TEXT NOT NULL,
    "diasAtra" TEXT NOT NULL,
    "total" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "estoque" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL
);
INSERT INTO "new_Book" ("autor", "categoria", "descricao", "estoque", "id", "nome", "valor") SELECT "autor", "categoria", "descricao", "estoque", "id", "nome", "valor" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE TABLE "new_Reader" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "dataNasc" DATETIME NOT NULL,
    "criadoEm" DATETIME NOT NULL
);
INSERT INTO "new_Reader" ("cpf", "dataNasc", "email", "id", "nome", "telefone") SELECT "cpf", "dataNasc", "email", "id", "nome", "telefone" FROM "Reader";
DROP TABLE "Reader";
ALTER TABLE "new_Reader" RENAME TO "Reader";
CREATE TABLE "new_Librarian" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "dataNasc" DATETIME NOT NULL,
    "senha" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL
);
INSERT INTO "new_Librarian" ("cpf", "dataNasc", "email", "id", "nome", "senha", "telefone") SELECT "cpf", "dataNasc", "email", "id", "nome", "senha", "telefone" FROM "Librarian";
DROP TABLE "Librarian";
ALTER TABLE "new_Librarian" RENAME TO "Librarian";
PRAGMA foreign_key_check("Book");
PRAGMA foreign_key_check("Reader");
PRAGMA foreign_key_check("Librarian");
PRAGMA foreign_keys=ON;
