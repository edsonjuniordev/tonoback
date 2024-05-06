import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/prisma/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { AccountModule } from './modules/account/account.module';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { env } from '../../../package/config/env';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [UserModule, DatabaseModule, AuthModule, AccountModule, CategoryModule, TransactionModule, ThrottlerModule.forRoot([{
    ttl: env.rateLimitTTL,
    limit: env.rateLimitRequests,
  }]), EmailModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule { }
