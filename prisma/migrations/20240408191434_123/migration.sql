/*
  Warnings:

  - You are about to drop the column `radius` on the `joboffers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `joboffers` DROP COLUMN `radius`,
    MODIFY `status` ENUM('SENT', 'ACCEPTED', 'DECLINED', 'EXPIRED') NOT NULL DEFAULT 'SENT';
