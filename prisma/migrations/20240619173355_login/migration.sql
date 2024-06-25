/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Librarian` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Librarian_email_key" ON "Librarian"("email");
