/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Dairy` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Dairy" DROP CONSTRAINT "Dairy_userId_fkey";

-- AlterTable
ALTER TABLE "Mood" ADD COLUMN     "phrase" TEXT;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name";

-- DropTable
DROP TABLE "Dairy";
