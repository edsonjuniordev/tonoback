import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionRepository } from '../../../shared/repositories/transaction.repository';
import { TransactionType } from '../entities/transaction';
import { ValidateAccountOwnershipService } from '../../account/services/validate-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../../category/services/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { AccountRepository } from '../../../shared/repositories/account.repository';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository, private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService, private readonly validateAccountOwnershipService: ValidateAccountOwnershipService, private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,private readonly accountRepository: AccountRepository) { }

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
      throw new BadRequestException("transaction not created")
    }

    return transaction;
  }

  findAllByUserId(userId: string, filters: { month: number, year: number, accountId?: string, type?: TransactionType }) {
    return this.transactionRepository.findMany({
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
        transactionDate: 'asc'
      }
    });
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

    await this.validateEntitiesOwnership({
      userId,
      accountId,
      categoryId,
      transactionId,
    });

    return this.transactionRepository.update({
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
  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOwnership({ userId, transactionId });

    await this.transactionRepository.delete({
      where: { id: transactionId },
    });

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
    await Promise.all([
      transactionId &&
      this.validateTransactionOwnershipService.validate(
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
  }
}
