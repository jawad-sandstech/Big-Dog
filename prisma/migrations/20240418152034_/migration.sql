/*
  Warnings:

  - Made the column `numberOfMiles` on table `uservehicles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `numberOfOccupants` on table `uservehicles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `parkingLotInfo` on table `uservehicles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `roadsideLocationSafe` on table `uservehicles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `uservehicles` MODIFY `numberOfMiles` INTEGER NOT NULL,
    MODIFY `numberOfOccupants` INTEGER NOT NULL,
    MODIFY `parkingLotInfo` VARCHAR(191) NOT NULL,
    MODIFY `roadsideLocationSafe` BOOLEAN NOT NULL;
