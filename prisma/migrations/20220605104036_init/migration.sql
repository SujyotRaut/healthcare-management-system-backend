/*
  Warnings:

  - You are about to drop the column `patientId` on the `Insurance` table. All the data in the column will be lost.
  - Added the required column `patientName` to the `Insurance` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Bed_bedNo_roomId_key";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Insurance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "patientName" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "endDate" TEXT NOT NULL
);
INSERT INTO "new_Insurance" ("amount", "companyName", "endDate", "id", "name") SELECT "amount", "companyName", "endDate", "id", "name" FROM "Insurance";
DROP TABLE "Insurance";
ALTER TABLE "new_Insurance" RENAME TO "Insurance";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
