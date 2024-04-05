-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `Messages_conversationId_fkey`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `isProfileComplete` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `roleSelected` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `Conversations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
