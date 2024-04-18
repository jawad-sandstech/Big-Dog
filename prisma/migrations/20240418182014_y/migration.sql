/*
  Warnings:

  - Made the column `isPrimary` on table `feedbackimages` required. This step will fail if there are existing NULL values in that column.
  - Made the column `path` on table `feedbackimages` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `feedbackimages` MODIFY `isPrimary` BOOLEAN NOT NULL,
    MODIFY `path` VARCHAR(191) NOT NULL;
