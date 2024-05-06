import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountRepository } from '@infra/database/prisma/repositories/account.repository';

@Injectable()
export class ValidateAccountOwnershipService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async validate(userId: string, accountId: string) {
    const isOwner = await this.accountRepository.findFirst({
      where: { id: accountId, userId }
    })

    if (!isOwner) {
      throw new NotFoundException("account not found")
    }

    return isOwner
  }
}
