import { Module } from '@nestjs/common';
import { AccountService } from './services/account.service';
import { AccountController } from './account.controller';
import { ValidateAccountOwnershipService } from './services/validate-account-ownership.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService, ValidateAccountOwnershipService],
  exports: [ValidateAccountOwnershipService, AccountService]
})
export class AccountModule {}
