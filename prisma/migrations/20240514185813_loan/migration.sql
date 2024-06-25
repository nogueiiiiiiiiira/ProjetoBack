-- CreateTable
CREATE TABLE "Loan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "dataEmp" DATETIME NOT NULL,
    "dataDev" DATETIME NOT NULL
);
