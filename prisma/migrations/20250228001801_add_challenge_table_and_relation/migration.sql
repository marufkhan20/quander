-- CreateEnum
CREATE TYPE "ChallengeStatus" AS ENUM ('active', 'voting', 'close');

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "challengeId" TEXT;

-- CreateTable
CREATE TABLE "Challenge" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail" TEXT,
    "status" "ChallengeStatus" NOT NULL DEFAULT 'active',
    "submitVideos" TEXT[],
    "winners" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);
