import { AccountRepository } from "@application/repository/account.repository"
import { AccountType } from "@application/domain/entities/account.entity"

export type GetAccountByIdUseCaseBuildDto = {
  accountRepository: AccountRepository
}

export type GetAccountByIdUseCaseInputDto = {
  accountId: string
  userId: string
}

export type GetAccountByIdUseCaseOutputDto = {
  id: string;
  userId: string;
  name: string;
  balance: number;
  color: string;
  type: AccountType;
  createdAt: Date;
  updatedAt: Date;
}