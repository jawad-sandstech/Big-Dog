/*
  Warnings:

  - You are about to drop the column `lastUpdated` on the `userrescuecharges` table. All the data in the column will be lost.
  - Added the required column `expireAt` to the `UserPackages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `UserRescueCharges` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `userpackages` ADD COLUMN `expireAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `userrescuecharges` DROP COLUMN `lastUpdated`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
