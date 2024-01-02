/*
  Warnings:

  - Added the required column `color` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_date` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "account_type" AS ENUM ('CHECKING', 'INVESTMENT', 'CASH');

-- CreateEnum
CREATE TYPE "transaction_type" AS ENUM ('IN', 'OUT');

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "type" "account_type" NOT NULL;

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "type" "transaction_type" NOT NULL;

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "transaction_date" TEXT NOT NULL,
ALTER COLUMN "category_id" DROP NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "transaction_type" NOT NULL;
