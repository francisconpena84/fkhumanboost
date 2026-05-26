-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "googlePlaceId" TEXT,
ADD COLUMN     "googleRating" DOUBLE PRECISION,
ADD COLUMN     "googleReviews" INTEGER,
ADD COLUMN     "photoReference" TEXT;
