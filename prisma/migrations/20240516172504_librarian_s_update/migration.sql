/*
  Warnings:

  - Added the required column `senha` to the `Librarian` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Librarian" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "dataNasc" DATETIME NOT NULL,
    "senha" TEXT NOT NULL
);
INSERT INTO "new_Librarian" ("cpf", "dataNasc", "email", "id", "nome", "telefone") SELECT "cpf", "dataNasc", "email", "id", "nome", "telefone" FROM "Librarian";
DROP TABLE "Librarian";
ALTER TABLE "new_Librarian" RENAME TO "Librarian";
PRAGMA foreign_key_check("Librarian");
PRAGMA foreign_keys=ON;
