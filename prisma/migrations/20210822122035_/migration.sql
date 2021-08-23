-- DropIndex
DROP INDEX "Mood.userId_unique";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- RenameIndex
ALTER INDEX "Profile.userId_unique" RENAME TO "Profile_userId_unique";
