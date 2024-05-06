import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionRepository } from '@infra/database/prisma/repositories/transaction.repository';
import { TransactionType } from '../entities/transaction';
import { ValidateAccountOwnershipService } from '../../account/services/validate-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../../category/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { AccountRepository } from '@infra/database/prisma/repositories/account.repository';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository, private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService, private readonly validateAccountOwnershipService: ValidateAccountOwnershipService, private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService, private readonly accountRepository: AccountRepository) { }

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { accountId, categoryId, description, type, value, transactionDate } = createTransactionDto

    await this.validateEntitiesOwnership({ userId, accountId, categoryId })

    const transaction = await this.transactionRepository.create({
      data: {
        userId,
        accountId,
        categoryId,
        description,
        type,
        value,
        transactionDate,
        createdAt: new Date().toISOString(),
      }
    })

    if (transaction) {
      const userAccount = await this.accountRepository.findUnique({
        where: {
          id: accountId
        }
      })
      const transactionValue = type === TransactionType.IN ? userAccount.balance + value : userAccount.balance - value

      await this.accountRepository.update({
        where: {
          id: accountId
        },
        data: {
          balance: transactionValue
        }
      })
    } else {
      throw new InternalServerErrorException("internal server error")
    }

    return transaction;
  }

  async findAllByUserId(userId: string, filters: { month: number, year: number, accountId?: string, type?: TransactionType }) {
    const transactions = await this.transactionRepository.findMany({
      where: {
        userId,
        accountId: filters.accountId,
        type: filters.type,
        transactionDate: {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month + 1))
        }
      },
      orderBy: {
        transactionDate: 'desc'
      }
    });
    
    const transactionsValue = transactions.reduce((acc, transaction) => {
      if (transaction.type === TransactionType.IN) acc.inValue += transaction.value
      if (transaction.type === TransactionType.OUT) acc.outValue += transaction.value
      return acc
    }, {
      inValue: 0,
      outValue: 0
    })
    
    return {
      transactionsValue,
      transactions
    }
  }

  async findOneByIdAndUserId(transactionId: string, userId: string) {
    const isOwner = await this.transactionRepository.findUnique({
      where: {
        id: transactionId,
        userId
      }
    })

    if (!isOwner) {
      throw new NotFoundException("transaction not found")
    }

    return isOwner;
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { accountId, categoryId, description, transactionDate, type, value } =
      updateTransactionDto;

    const [, isAccountOwner] = await this.validateEntitiesOwnership({
      userId,
      accountId,
      categoryId,
      transactionId,
    });

    const transaction = await this.transactionRepository.findFirst({
      where: { id: transactionId, userId }
    })

    const transactionUpdated = await this.transactionRepository.update({
      where: { id: transactionId },
      data: {
        accountId,
        categoryId,
        description,
        transactionDate,
        type,
        value
      },
    });

    if (transactionUpdated) {
      const accountBalance = transaction.type === TransactionType.IN ? isAccountOwner.balance - transaction.value : isAccountOwner.balance + transaction.value
      const balanceValue = type === TransactionType.IN ? accountBalance + value : accountBalance - value

      await this.accountRepository.update({
        where: {
          id: accountId
        },
        data: {
          balance: balanceValue
        }
      })

      return transactionUpdated
    } else {
      throw new InternalServerErrorException("internal server error")
    }
  }

  async delete(transactionId: string, userId: string) {
    await this.validateEntitiesOwnership({ userId, transactionId });

    const transactionDeleted = await this.transactionRepository.delete({
      where: { id: transactionId },
    });

    if (transactionDeleted) {
      const userAccount = await this.accountRepository.findUnique({
        where: {
          id: transactionDeleted.accountId
        }
      })
      const accountBalance = transactionDeleted.type === TransactionType.IN ? userAccount.balance - transactionDeleted.value : userAccount.balance + transactionDeleted.value

      await this.accountRepository.update({
        where: {
          id: transactionDeleted.accountId
        },
        data: {
          balance: accountBalance
        }
      })
    } else {
      throw new InternalServerErrorException("internal server error")
    }

    return null;
  }

  private async validateEntitiesOwnership({
    userId,
    accountId,
    categoryId,
    transactionId,
  }: {
    userId: string;
    accountId?: string;
    categoryId?: string;
    transactionId?: string;
  }) {

    const results = await Promise.all([
      transactionId &&
      await this.validateTransactionOwnershipService.validate(
        userId,
        transactionId,
      ),
      accountId &&
      this.validateAccountOwnershipService.validate(
        userId,
        accountId,
      ),
      categoryId &&
      this.validateCategoryOwnershipService.validate(userId, categoryId),
    ]);

    return results
  }
}
