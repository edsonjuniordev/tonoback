import { AccountType } from "@application/domain/entities/account.entity"
import { AccountRepository } from "@application/repository/account.repository";

export type CreateAccountBuildDto = {
  accountRepository: AccountRepository;
}

export type CreateAccountInputDto = {
  userId: string;
  name: string
  balance: number
  color: string
  type: AccountType
}

export type CreateAccountOutputDto = {
  id: string;
  name: string;
  balance: number;
  color: string;
  type: AccountType;
  createdAt: Date;
  updatedAt: Date;
}