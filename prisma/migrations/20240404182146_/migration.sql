/*
  Warnings:

  - The values [PHONENUMBER] on the enum `UserOTP_otpType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `userotp` MODIFY `otpType` ENUM('PHONE_NUMBER', 'EMAIL') NOT NULL;
