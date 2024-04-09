/*
  Warnings:

  - A unique constraint covering the columns `[conversationId]` on the table `JobRequests` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `jobrequests` ADD COLUMN `conversationId` INTEGER NULL,
    ADD COLUMN `hasLeftReview` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `JobRequests_conversationId_key` ON `JobRequests`(`conversationId`);

-- AddForeignKey
ALTER TABLE `JobRequests` ADD CONSTRAINT `JobRequests_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `Conversations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
