import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from '../repositories/user.repository';
import { AccountRepository } from '../repositories/account.repository';
import { CategoryRepository } from '../repositories/category.repository';

@Global()
@Module({
    providers: [PrismaService, UserRepository, AccountRepository, CategoryRepository],
    exports: [UserRepository, AccountRepository, CategoryRepository]
})
export class DatabaseModule {}
