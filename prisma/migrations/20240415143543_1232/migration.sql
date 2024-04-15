/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `feedbackimages` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `FeedbackImages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimetype` to the `FeedbackImages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalName` to the `FeedbackImages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `FeedbackImages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `feedbackimages` DROP COLUMN `imageUrl`,
    ADD COLUMN `fileName` VARCHAR(191) NOT NULL,
    ADD COLUMN `mimetype` VARCHAR(191) NOT NULL,
    ADD COLUMN `originalName` VARCHAR(191) NOT NULL,
    ADD COLUMN `size` DOUBLE NOT NULL;
