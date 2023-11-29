import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountRepository } from '../../shared/repositories/account.repository';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) { }

  create(userId: string, createAccountDto: CreateAccountDto) {
    const { name, balance } = createAccountDto
    const now = new Date().toISOString()
    
    return this.accountRepository.create({
      data: {
        name,
        balance,
        userId,
        created_at: now,
        updated_at: now
      }
    });
  }

  findAll() {
    return `This action returns all account`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
