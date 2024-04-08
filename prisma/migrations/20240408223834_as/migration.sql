-- AddForeignKey
ALTER TABLE `DriverReviews` ADD CONSTRAINT `DriverReviews_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DriverReviews` ADD CONSTRAINT `DriverReviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
