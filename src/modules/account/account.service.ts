import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountRepository } from '../../shared/repositories/account.repository';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) { }

  create(userId: string, createAccountDto: CreateAccountDto) {
    const { name, balance, color, type } = createAccountDto
    const now = new Date().toISOString()

    return this.accountRepository.create({
      data: {
        name,
        balance,
        userId,
        color,
        type,
        createdAt: now,
        updatedAt: now
      }
    });
  }

  findAllByUserId(userId: string) {
    return this.accountRepository.findMany({
      where: {
        userId
      }
    });
  }

  async update(accountId: string, userId: string, updateAccountDto: UpdateAccountDto) {

    const isOwner = await this.accountRepository.findFirst({
      where: { id: accountId, userId }
    })

    if (!isOwner) {
      throw new NotFoundException("account not found")
    }

    const now = new Date().toISOString()

    return this.accountRepository.update({
      where: { id: accountId },
      data: {
        ...updateAccountDto,
        updatedAt: now
      }
    });
  }

  async delete(accountId: string, userId: string) {
    const isOwner = await this.accountRepository.findFirst({
      where: { id: accountId, userId }
    })

    if (!isOwner) {
      throw new NotFoundException("account not found")
    }
    await this.accountRepository.delete({
      where: { id: accountId }
    });

    return null
  }
}
