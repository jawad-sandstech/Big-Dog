-- DropForeignKey
ALTER TABLE `userotp` DROP FOREIGN KEY `UserOTP_userId_fkey`;

-- AddForeignKey
ALTER TABLE `UserOTP` ADD CONSTRAINT `UserOTP_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
