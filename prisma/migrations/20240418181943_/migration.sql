/*
  Warnings:

  - You are about to drop the column `fileName` on the `feedbackimages` table. All the data in the column will be lost.
  - You are about to drop the column `mimetype` on the `feedbackimages` table. All the data in the column will be lost.
  - You are about to drop the column `originalName` on the `feedbackimages` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `feedbackimages` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `feedbackimages` DROP FOREIGN KEY `FeedbackImages_feedbackId_fkey`;

-- AlterTable
ALTER TABLE `feedbackimages` DROP COLUMN `fileName`,
    DROP COLUMN `mimetype`,
    DROP COLUMN `originalName`,
    DROP COLUMN `size`,
    ADD COLUMN `isPrimary` BOOLEAN NULL,
    ADD COLUMN `path` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `FeedbackImages` ADD CONSTRAINT `FeedbackImages_feedbackId_fkey` FOREIGN KEY (`feedbackId`) REFERENCES `Feedback`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
