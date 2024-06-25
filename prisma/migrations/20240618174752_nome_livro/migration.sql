/*
  Warnings:

  - Added the required column `nomeLivro` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Loan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "idLivro" TEXT NOT NULL,
    "nomeLivro" TEXT NOT NULL,
    "dataEmp" TEXT NOT NULL,
    "dataDev" TEXT NOT NULL
);
INSERT INTO "new_Loan" ("cpf", "dataDev", "dataEmp", "id", "idLivro") SELECT "cpf", "dataDev", "dataEmp", "id", "idLivro" FROM "Loan";
DROP TABLE "Loan";
ALTER TABLE "new_Loan" RENAME TO "Loan";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
