/*
  Warnings:

  - Added the required column `estoque` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "estoque" TEXT NOT NULL
);
INSERT INTO "new_Book" ("autor", "categoria", "descricao", "id", "nome", "valor") SELECT "autor", "categoria", "descricao", "id", "nome", "valor" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_key_check("Book");
PRAGMA foreign_keys=ON;
