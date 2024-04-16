/*
  Warnings:

  - You are about to drop the column `image` on the `usernotifications` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `usernotifications` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `usernotifications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `usernotifications` DROP COLUMN `image`,
    DROP COLUMN `metadata`,
    DROP COLUMN `type`,
    MODIFY `hasSeen` BOOLEAN NOT NULL DEFAULT false;
