/*
  Warnings:

  - You are about to drop the column `genderId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `Users_genderId_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `genderId`,
    ADD COLUMN `gender` ENUM('MALE', 'FEMALE', 'OTHER') NULL,
    ADD COLUMN `gendersId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_gendersId_fkey` FOREIGN KEY (`gendersId`) REFERENCES `Genders`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
