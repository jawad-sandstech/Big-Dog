/*
  Warnings:

  - You are about to drop the column `address` on the `useraddress` table. All the data in the column will be lost.
  - Added the required column `streetAddress` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `useraddress` DROP COLUMN `address`,
    ADD COLUMN `streetAddress` VARCHAR(191) NOT NULL;
