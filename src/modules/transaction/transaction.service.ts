import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionRepository } from '../../shared/repositories/transaction.repository';
import { AccountRepository } from '../../shared/repositories/account.repository';
import { CategoryRepository } from '../../shared/repositories/category.repository';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository, private readonly accountRepository: AccountRepository, private readonly categoryRepository: CategoryRepository) { }

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { accountId, categoryId, description, type, value } = createTransactionDto

    const isOwner = await this.accountRepository.findUnique({
      where: {
        id: accountId,
        userId
      }
    })

    if (!isOwner) {
      throw new NotFoundException("account not found")
    }

    const categoryExists = await this.categoryRepository.findUnique({
      where: {
        id: categoryId
      }
    })

    if (!categoryExists) {
      throw new NotFoundException("category not found")
    }

    if (value > isOwner.balance) {
      throw new BadRequestException("insuficient balance")
    }

    const transaction = await this.transactionRepository.create({
      data: {
        userId,
        accountId,
        categoryId,
        description,
        type,
        value,
        createdAt: new Date().toISOString(),
      }
    })

    if (transaction) {
      const transactionValue = type === "in" ? isOwner.balance + value : isOwner.balance - value

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

  findAllByUserId(userId: string) {
    return this.transactionRepository.findMany({
      where: {
        userId
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
}
