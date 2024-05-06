import { AccountRepository } from "@application/repository/account.repository"
import { AccountType } from "@application/domain/entities/account.entity";

export type GetUserAccountsBuildDto = {
  accountRepository: AccountRepository
}

export type GetUserAccountsInputDto = {
  userId: string;
}

export type GetUserAccountsOutputDto = {
  id: string;
  userId: string;
  name: string;
  balance: number;
  color: string;
  type: AccountType;
  createdAt: Date;
  updatedAt: Date;
}[]