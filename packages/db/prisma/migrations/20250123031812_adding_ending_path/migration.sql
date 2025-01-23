/*
  Warnings:

  - Added the required column `endX` to the `Shape` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endY` to the `Shape` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shape" ADD COLUMN     "endX" INTEGER NOT NULL,
ADD COLUMN     "endY" INTEGER NOT NULL;
