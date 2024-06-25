/*
  Warnings:

  - Added the required column `cof` to the `Return` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Return" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cof" TEXT NOT NULL,
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
