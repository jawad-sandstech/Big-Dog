/*
  Warnings:

  - You are about to drop the column `gendersId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `genders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `Users_gendersId_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `gendersId`;

-- DropTable
DROP TABLE `genders`;
