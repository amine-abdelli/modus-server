/*
  Warnings:

  - You are about to drop the column `hello` on the `Dairy` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Dairy` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dairy" DROP COLUMN "hello",
DROP COLUMN "published",
ALTER COLUMN "updatedAt" DROP NOT NULL;
