/*
  Warnings:

  - Made the column `path` on table `productimages` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `productimages` MODIFY `path` VARCHAR(191) NOT NULL;
