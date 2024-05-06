import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { ValidateAccountOwnershipService } from './services/validate-account-ownership.service';
import { providers } from './providers/providers';

@Module({
  controllers: [AccountController],
  providers: [ValidateAccountOwnershipService, ...providers],
  exports: [ValidateAccountOwnershipService]
})
export class AccountModule {}
