import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionRepository } from '@infra/database/prisma/repositories/transaction.repository';

@Injectable()
export class ValidateTransactionOwnershipService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async validate(userId: string, transactionId: string) {
    const isOwner = await this.transactionRepository.findFirst({
      where: { id: transactionId, userId }
    })

    if (!isOwner) {
      throw new NotFoundException("transaction not found")
    }

    return isOwner
  }
}
