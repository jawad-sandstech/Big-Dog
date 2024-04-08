/*
  Warnings:

  - You are about to drop the column `isActive` on the `packages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `packages` DROP COLUMN `isActive`;

-- AlterTable
ALTER TABLE `userpackages` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;
