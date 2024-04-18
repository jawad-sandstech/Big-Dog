/*
  Warnings:

  - You are about to drop the column `fileName` on the `productimages` table. All the data in the column will be lost.
  - You are about to drop the column `mimetype` on the `productimages` table. All the data in the column will be lost.
  - You are about to drop the column `originalName` on the `productimages` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `productimages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `productimages` DROP COLUMN `fileName`,
    DROP COLUMN `mimetype`,
    DROP COLUMN `originalName`,
    DROP COLUMN `size`,
    ADD COLUMN `path` VARCHAR(191) NULL;
