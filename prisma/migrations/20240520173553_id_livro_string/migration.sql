-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Loan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "idLivro" TEXT NOT NULL,
    "dataEmp" DATETIME NOT NULL,
    "dataDev" DATETIME NOT NULL
);
INSERT INTO "new_Loan" ("cpf", "dataDev", "dataEmp", "id", "idLivro") SELECT "cpf", "dataDev", "dataEmp", "id", "idLivro" FROM "Loan";
DROP TABLE "Loan";
ALTER TABLE "new_Loan" RENAME TO "Loan";
PRAGMA foreign_key_check("Loan");
PRAGMA foreign_keys=ON;
