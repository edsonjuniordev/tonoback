import { Module } from '@nestjs/common';
import { TransactionService } from './services/transaction.service';
import { TransactionController } from './transaction.controller';
import { ValidateAccountOwnershipService } from '../account/services/validate-account-ownership.service';
import { AccountModule } from '../account/account.module';
import { CategoryModule } from '../category/category.module';
import { ValidateCategoryOwnershipService } from '../category/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './services/validate-transaction-ownership.service';
import { AccountService } from '../account/services/account.service';

@Module({
  imports: [AccountModule, CategoryModule],
  controllers: [TransactionController],
  providers: [TransactionService, ValidateAccountOwnershipService, ValidateCategoryOwnershipService, ValidateTransactionOwnershipService, AccountService],
})
export class TransactionModule {}
