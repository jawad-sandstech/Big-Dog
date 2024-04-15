-- DropForeignKey
ALTER TABLE `driverdetails` DROP FOREIGN KEY `DriverDetails_userId_fkey`;

-- DropForeignKey
ALTER TABLE `driverslocation` DROP FOREIGN KEY `DriversLocation_userId_fkey`;

-- DropForeignKey
ALTER TABLE `useraddress` DROP FOREIGN KEY `UserAddress_userId_fkey`;

-- DropForeignKey
ALTER TABLE `usernotifications` DROP FOREIGN KEY `UserNotifications_userId_fkey`;

-- DropForeignKey
ALTER TABLE `userpackages` DROP FOREIGN KEY `UserPackages_userId_fkey`;

-- DropForeignKey
ALTER TABLE `userpreference` DROP FOREIGN KEY `UserPreference_userId_fkey`;

-- DropForeignKey
ALTER TABLE `userrescuecharges` DROP FOREIGN KEY `UserRescueCharges_userId_fkey`;

-- DropForeignKey
ALTER TABLE `userstatus` DROP FOREIGN KEY `UserStatus_userId_fkey`;

-- DropForeignKey
ALTER TABLE `uservehicles` DROP FOREIGN KEY `UserVehicles_userId_fkey`;

-- AddForeignKey
ALTER TABLE `UserAddress` ADD CONSTRAINT `UserAddress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserStatus` ADD CONSTRAINT `UserStatus_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserVehicles` ADD CONSTRAINT `UserVehicles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DriverDetails` ADD CONSTRAINT `DriverDetails_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DriversLocation` ADD CONSTRAINT `DriversLocation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPackages` ADD CONSTRAINT `UserPackages_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRescueCharges` ADD CONSTRAINT `UserRescueCharges_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserNotifications` ADD CONSTRAINT `UserNotifications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPreference` ADD CONSTRAINT `UserPreference_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
