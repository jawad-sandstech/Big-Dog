/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `DriversLocation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `DriversLocation_userId_key` ON `DriversLocation`(`userId`);
