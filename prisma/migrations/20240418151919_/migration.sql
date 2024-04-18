/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserStatus` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `uservehicles` ADD COLUMN `numberOfMiles` INTEGER NULL,
    ADD COLUMN `numberOfOccupants` INTEGER NULL,
    ADD COLUMN `parkingLotInfo` VARCHAR(191) NULL,
    ADD COLUMN `roadsideLocationSafe` BOOLEAN NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UserStatus_userId_key` ON `UserStatus`(`userId`);
