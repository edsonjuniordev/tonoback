import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { AccountRepository } from '../../../shared/repositories/account.repository';
import { ValidateAccountOwnershipService } from './validate-account-ownership.service';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository, private readonly validateAccountOwnershipService: ValidateAccountOwnershipService) { }

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
      },
      orderBy: {
        createdAt: "asc"
      }
    });
  }

  findOneById(accountId: string) {
    return this.accountRepository.findUnique({
      where: {
        id: accountId
      }
    })
  }

  async update(accountId: string, userId: string, updateAccountDto: UpdateAccountDto) {

    await this.validateAccountOwnershipService.validate(userId, accountId)

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
    await this.validateAccountOwnershipService.validate(userId, accountId)

    await this.accountRepository.delete({
      where: { id: accountId }
    });

    return null
  }
}
