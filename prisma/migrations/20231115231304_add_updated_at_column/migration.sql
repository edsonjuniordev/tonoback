/*
  Warnings:

  - Added the required column `updated_at` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "updated_at" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "updated_at" TEXT NOT NULL;
