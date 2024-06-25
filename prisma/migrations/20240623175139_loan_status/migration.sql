/*
  Warnings:

  - Added the required column `nomeLeitor` to the `Fine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeLivro` to the `Fine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeLeitor` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeLivro` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusEmp` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeLeitor` to the `Return` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeLivro` to the `Return` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "nomeLeitor" TEXT NOT NULL,
    "idLivro" TEXT NOT NULL,
    "nomeLivro" TEXT NOT NULL,
    "diasAtra" TEXT NOT NULL,
    "total" TEXT NOT NULL,
    "statusPag" TEXT NOT NULL,
    "criadoEm" TEXT NOT NULL
);
INSERT INTO "new_Fine" ("cpf", "criadoEm", "diasAtra", "id", "idLivro", "statusPag", "total") SELECT "cpf", "criadoEm", "diasAtra", "id", "idLivro", "statusPag", "total" FROM "Fine";
DROP TABLE "Fine";
ALTER TABLE "new_Fine" RENAME TO "Fine";
CREATE TABLE "new_Loan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "nomeLeitor" TEXT NOT NULL,
    "idLivro" TEXT NOT NULL,
    "nomeLivro" TEXT NOT NULL,
    "dataEmp" TEXT NOT NULL,
    "dataDev" TEXT NOT NULL,
    "statusEmp" TEXT NOT NULL
);
INSERT INTO "new_Loan" ("cpf", "dataDev", "dataEmp", "id", "idLivro") SELECT "cpf", "dataDev", "dataEmp", "id", "idLivro" FROM "Loan";
DROP TABLE "Loan";
ALTER TABLE "new_Loan" RENAME TO "Loan";
CREATE TABLE "new_Return" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "nomeLeitor" TEXT NOT NULL,
    "idLivro" TEXT NOT NULL,
    "nomeLivro" TEXT NOT NULL,
    "prevDev" TEXT NOT NULL,
    "dataAtual" TEXT NOT NULL,
    "multaAtribuida" TEXT NOT NULL
);
INSERT INTO "new_Return" ("cpf", "dataAtual", "id", "idLivro", "multaAtribuida", "prevDev") SELECT "cpf", "dataAtual", "id", "idLivro", "multaAtribuida", "prevDev" FROM "Return";
DROP TABLE "Return";
ALTER TABLE "new_Return" RENAME TO "Return";
PRAGMA foreign_key_check("Fine");
PRAGMA foreign_key_check("Loan");
PRAGMA foreign_key_check("Return");
PRAGMA foreign_keys=ON;
