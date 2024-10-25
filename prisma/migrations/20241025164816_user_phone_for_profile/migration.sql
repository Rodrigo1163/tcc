/*
  Warnings:

  - You are about to drop the column `cellphone` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `profiles` ADD COLUMN `cellphone` VARCHAR(15) NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `cellphone`;
