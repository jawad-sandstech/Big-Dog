/*
  Warnings:

  - You are about to drop the column `isEmailVerified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isPhoneNumberVerified` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `isEmailVerified`,
    DROP COLUMN `isPhoneNumberVerified`;
