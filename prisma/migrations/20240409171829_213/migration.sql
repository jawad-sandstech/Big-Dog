/*
  Warnings:

  - You are about to drop the column `userAccepted` on the `jobrequests` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `UserVehicles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `jobrequests` DROP COLUMN `userAccepted`,
    ADD COLUMN `hasAccepted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `hasPaid` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `UserVehicles_userId_key` ON `UserVehicles`(`userId`);
