/*
  Warnings:

  - You are about to drop the column `cof` on the `Return` table. All the data in the column will be lost.
  - Added the required column `cpf` to the `Return` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Return" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "idLivro" TEXT NOT NULL,
    "prevDev" DATETIME NOT NULL,
    "dataAtual" DATETIME NOT NULL,
    "multaAtribuida" TEXT NOT NULL
);
INSERT INTO "new_Return" ("dataAtual", "id", "idLivro", "multaAtribuida", "prevDev") SELECT "dataAtual", "id", "idLivro", "multaAtribuida", "prevDev" FROM "Return";
DROP TABLE "Return";
ALTER TABLE "new_Return" RENAME TO "Return";
PRAGMA foreign_key_check("Return");
PRAGMA foreign_keys=ON;
