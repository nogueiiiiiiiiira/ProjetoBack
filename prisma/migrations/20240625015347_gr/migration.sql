/*
  Warnings:

  - You are about to drop the column `bibliotecario` on the `Resposta` table. All the data in the column will be lost.
  - You are about to drop the column `leitor` on the `Resposta` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resposta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mensagem" TEXT NOT NULL,
    "assunto" TEXT NOT NULL,
    "telefoneLeitor" TEXT NOT NULL,
    "criadoEm" TEXT NOT NULL
);
INSERT INTO "new_Resposta" ("assunto", "criadoEm", "id", "mensagem", "telefoneLeitor") SELECT "assunto", "criadoEm", "id", "mensagem", "telefoneLeitor" FROM "Resposta";
DROP TABLE "Resposta";
ALTER TABLE "new_Resposta" RENAME TO "Resposta";
PRAGMA foreign_key_check("Resposta");
PRAGMA foreign_keys=ON;
