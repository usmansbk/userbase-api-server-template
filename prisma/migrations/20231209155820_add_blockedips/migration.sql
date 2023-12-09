-- AlterTable
ALTER TABLE "User" ADD COLUMN     "blockedIps" JSONB NOT NULL DEFAULT '{}';
