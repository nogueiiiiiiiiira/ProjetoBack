/*
  Warnings:

  - You are about to drop the column `status` on the `Fine` table. All the data in the column will be lost.
  - Added the required column `statusPag` to the `Fine` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Historic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "acao" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "idLivro" TEXT NOT NULL,
    "diasAtra" TEXT NOT NULL,
    "total" REAL NOT NULL,
    "statusPag" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL
);
INSERT INTO "new_Fine" ("cpf", "criadoEm", "diasAtra", "id", "idLivro", "total") SELECT "cpf", "criadoEm", "diasAtra", "id", "idLivro", "total" FROM "Fine";
DROP TABLE "Fine";
ALTER TABLE "new_Fine" RENAME TO "Fine";
PRAGMA foreign_key_check("Fine");
PRAGMA foreign_keys=ON;
