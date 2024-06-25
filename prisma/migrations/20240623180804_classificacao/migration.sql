/*
  Warnings:

  - Added the required column `classificacaoIdade` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "estoque" TEXT NOT NULL,
    "classificacaoIdade" TEXT NOT NULL,
    "criadoEm" TEXT NOT NULL
);
INSERT INTO "new_Book" ("autor", "categoria", "criadoEm", "descricao", "estoque", "id", "nome") SELECT "autor", "categoria", "criadoEm", "descricao", "estoque", "id", "nome" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_key_check("Book");
PRAGMA foreign_keys=ON;
