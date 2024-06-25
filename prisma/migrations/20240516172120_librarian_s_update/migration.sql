/*
  Warnings:

  - You are about to drop the column `senha` on the `Librarian` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Librarian" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "dataNasc" DATETIME NOT NULL
);
INSERT INTO "new_Librarian" ("cpf", "dataNasc", "email", "id", "nome", "telefone") SELECT "cpf", "dataNasc", "email", "id", "nome", "telefone" FROM "Librarian";
DROP TABLE "Librarian";
ALTER TABLE "new_Librarian" RENAME TO "Librarian";
PRAGMA foreign_key_check("Librarian");
PRAGMA foreign_keys=ON;
