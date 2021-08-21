/*
  Warnings:

  - Added the required column `content` to the `Dairy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dairy" ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastPasswordReset" TIMESTAMP(3),
ADD COLUMN     "last_activity" TIMESTAMP(3),
ADD COLUMN     "password" TEXT NOT NULL;
