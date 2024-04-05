-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `Users_genderId_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `Users_roleId_fkey`;

-- DropIndex
DROP INDEX `Users_email_key` ON `users`;

-- AlterTable
ALTER TABLE `users` MODIFY `firstName` VARCHAR(191) NULL,
    MODIFY `lastName` VARCHAR(191) NULL,
    MODIFY `dateOfBirth` DATETIME(3) NULL,
    MODIFY `bio` VARCHAR(191) NULL,
    MODIFY `genderId` INTEGER NULL,
    MODIFY `roleId` INTEGER NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `isEmailActive` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `phoneNumber` VARCHAR(191) NULL,
    MODIFY `isPhoneNumberActive` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_genderId_fkey` FOREIGN KEY (`genderId`) REFERENCES `Genders`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
