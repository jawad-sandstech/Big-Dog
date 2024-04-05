/*
  Warnings:

  - You are about to drop the column `loginMethodId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `loginmethods` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `loginMethod` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `Users_loginMethodId_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `loginMethodId`,
    ADD COLUMN `loginMethod` ENUM('EMAIL', 'PHONE_NUMBER', 'GOOGLE', 'FACEBOOK', 'APPLE') NOT NULL;

-- DropTable
DROP TABLE `loginmethods`;
