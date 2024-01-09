/*
  Warnings:

  - Changed the type of `transaction_date` on the `transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "transaction_date",
ADD COLUMN     "transaction_date" TIMESTAMP(3) NOT NULL;
