/*
  Warnings:

  - You are about to drop the column `isEmailActive` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isPhoneNumberActive` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `isEmailActive`,
    DROP COLUMN `isPhoneNumberActive`,
    ADD COLUMN `isEmailVerified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isPhoneNumberVerified` BOOLEAN NOT NULL DEFAULT false;
