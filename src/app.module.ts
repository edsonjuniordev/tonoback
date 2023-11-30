import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { AccountModule } from './modules/account/account.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule, DatabaseModule, AuthModule, AccountModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class AppModule {}
