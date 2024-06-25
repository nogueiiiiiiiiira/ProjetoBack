/*
  Warnings:

  - You are about to alter the column `idLivro` on the `Loan` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Loan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "idLivro" INTEGER NOT NULL,
    "dataEmp" DATETIME NOT NULL,
    "dataDev" DATETIME NOT NULL
);
INSERT INTO "new_Loan" ("cpf", "dataDev", "dataEmp", "id", "idLivro") SELECT "cpf", "dataDev", "dataEmp", "id", "idLivro" FROM "Loan";
DROP TABLE "Loan";
ALTER TABLE "new_Loan" RENAME TO "Loan";
PRAGMA foreign_key_check("Loan");
PRAGMA foreign_keys=ON;
