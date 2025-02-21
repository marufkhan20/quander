-- CreateEnum
CREATE TYPE "VideoType" AS ENUM ('challange', 'regular');

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "type" "VideoType" NOT NULL DEFAULT 'regular';
