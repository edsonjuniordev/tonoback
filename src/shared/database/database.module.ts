import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from '../repositories/user.repository';
import { AccountRepository } from '../repositories/account.repository';

@Global()
@Module({
    providers: [PrismaService, UserRepository, AccountRepository],
    exports: [UserRepository, AccountRepository]
})
export class DatabaseModule {}
