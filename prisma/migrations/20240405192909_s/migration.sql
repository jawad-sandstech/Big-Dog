/*
  Warnings:

  - Made the column `price` on table `packages` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `packages` MODIFY `price` DOUBLE NOT NULL;
