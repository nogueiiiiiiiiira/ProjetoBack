/*
  Warnings:

  - Added the required column `mensagem` to the `Mensagem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mensagem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "assunto" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "criadoEm" TEXT NOT NULL
);
INSERT INTO "new_Mensagem" ("assunto", "criadoEm", "id", "nome", "telefone") SELECT "assunto", "criadoEm", "id", "nome", "telefone" FROM "Mensagem";
DROP TABLE "Mensagem";
ALTER TABLE "new_Mensagem" RENAME TO "Mensagem";
PRAGMA foreign_key_check("Mensagem");
PRAGMA foreign_keys=ON;
