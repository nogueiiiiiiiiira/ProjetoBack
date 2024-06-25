/*
  Warnings:

  - You are about to drop the column `title` on the `Loan` table. All the data in the column will be lost.
  - Added the required column `idLivro` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Loan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "idLivro" TEXT NOT NULL,
    "dataEmp" DATETIME NOT NULL,
    "dataDev" DATETIME NOT NULL
);
INSERT INTO "new_Loan" ("cpf", "dataDev", "dataEmp", "id") SELECT "cpf", "dataDev", "dataEmp", "id" FROM "Loan";
DROP TABLE "Loan";
ALTER TABLE "new_Loan" RENAME TO "Loan";
PRAGMA foreign_key_check("Loan");
PRAGMA foreign_keys=ON;
