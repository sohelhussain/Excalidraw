/*
  Warnings:

  - The `width` column on the `Shape` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `height` column on the `Shape` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `radius` column on the `Shape` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `startX` on the `Shape` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `startY` on the `Shape` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Shape" DROP COLUMN "width",
ADD COLUMN     "width" INTEGER,
DROP COLUMN "height",
ADD COLUMN     "height" INTEGER,
DROP COLUMN "startX",
ADD COLUMN     "startX" INTEGER NOT NULL,
DROP COLUMN "startY",
ADD COLUMN     "startY" INTEGER NOT NULL,
DROP COLUMN "radius",
ADD COLUMN     "radius" INTEGER;
