/*
  Warnings:

  - You are about to drop the `userpasswords` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `userpasswords` DROP FOREIGN KEY `UserPasswords_userId_fkey`;

-- DropTable
DROP TABLE `userpasswords`;
