/*
  Warnings:

  - Added the required column `hello` to the `Dairy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Dairy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dairy" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hello" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
