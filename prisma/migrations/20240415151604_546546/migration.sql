-- AlterTable
ALTER TABLE `orders` MODIFY `status` ENUM('PENDING', 'COMPLETE') NOT NULL DEFAULT 'PENDING';