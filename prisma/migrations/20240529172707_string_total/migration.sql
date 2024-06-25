-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "idLivro" TEXT NOT NULL,
    "diasAtra" TEXT NOT NULL,
    "total" TEXT NOT NULL,
    "statusPag" TEXT NOT NULL,
    "criadoEm" TEXT NOT NULL
);
INSERT INTO "new_Fine" ("cpf", "criadoEm", "diasAtra", "id", "idLivro", "statusPag", "total") SELECT "cpf", "criadoEm", "diasAtra", "id", "idLivro", "statusPag", "total" FROM "Fine";
DROP TABLE "Fine";
ALTER TABLE "new_Fine" RENAME TO "Fine";
PRAGMA foreign_key_check("Fine");
PRAGMA foreign_keys=ON;
