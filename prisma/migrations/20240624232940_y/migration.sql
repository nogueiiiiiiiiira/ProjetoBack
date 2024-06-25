/*
  Warnings:

  - You are about to drop the column `mensagem` on the `Mensagem` table. All the data in the column will be lost.
  - Added the required column `telefone` to the `Mensagem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mensagem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "assunto" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "criadoEm" TEXT NOT NULL
);
INSERT INTO "new_Mensagem" ("assunto", "criadoEm", "email", "id", "nome") SELECT "assunto", "criadoEm", "email", "id", "nome" FROM "Mensagem";
DROP TABLE "Mensagem";
ALTER TABLE "new_Mensagem" RENAME TO "Mensagem";
PRAGMA foreign_key_check("Mensagem");
PRAGMA foreign_keys=ON;
