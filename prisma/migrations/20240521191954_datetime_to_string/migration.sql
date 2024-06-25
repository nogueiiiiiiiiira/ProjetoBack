-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Librarian" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "dataNasc" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "criadoEm" TEXT NOT NULL
);
INSERT INTO "new_Librarian" ("cpf", "criadoEm", "dataNasc", "email", "id", "nome", "senha", "telefone") SELECT "cpf", "criadoEm", "dataNasc", "email", "id", "nome", "senha", "telefone" FROM "Librarian";
DROP TABLE "Librarian";
ALTER TABLE "new_Librarian" RENAME TO "Librarian";
CREATE TABLE "new_Return" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "idLivro" TEXT NOT NULL,
    "prevDev" TEXT NOT NULL,
    "dataAtual" TEXT NOT NULL,
    "multaAtribuida" TEXT NOT NULL
);
INSERT INTO "new_Return" ("cpf", "dataAtual", "id", "idLivro", "multaAtribuida", "prevDev") SELECT "cpf", "dataAtual", "id", "idLivro", "multaAtribuida", "prevDev" FROM "Return";
DROP TABLE "Return";
ALTER TABLE "new_Return" RENAME TO "Return";
CREATE TABLE "new_Loan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "idLivro" TEXT NOT NULL,
    "dataEmp" TEXT NOT NULL,
    "dataDev" TEXT NOT NULL
);
INSERT INTO "new_Loan" ("cpf", "dataDev", "dataEmp", "id", "idLivro") SELECT "cpf", "dataDev", "dataEmp", "id", "idLivro" FROM "Loan";
DROP TABLE "Loan";
ALTER TABLE "new_Loan" RENAME TO "Loan";
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "estoque" TEXT NOT NULL,
    "criadoEm" TEXT NOT NULL
);
INSERT INTO "new_Book" ("autor", "categoria", "criadoEm", "descricao", "estoque", "id", "nome") SELECT "autor", "categoria", "criadoEm", "descricao", "estoque", "id", "nome" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE TABLE "new_Fine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "idLivro" TEXT NOT NULL,
    "diasAtra" TEXT NOT NULL,
    "total" REAL NOT NULL,
    "statusPag" TEXT NOT NULL,
    "criadoEm" TEXT NOT NULL
);
INSERT INTO "new_Fine" ("cpf", "criadoEm", "diasAtra", "id", "idLivro", "statusPag", "total") SELECT "cpf", "criadoEm", "diasAtra", "id", "idLivro", "statusPag", "total" FROM "Fine";
DROP TABLE "Fine";
ALTER TABLE "new_Fine" RENAME TO "Fine";
PRAGMA foreign_key_check("Librarian");
PRAGMA foreign_key_check("Return");
PRAGMA foreign_key_check("Loan");
PRAGMA foreign_key_check("Book");
PRAGMA foreign_key_check("Fine");
PRAGMA foreign_keys=ON;
