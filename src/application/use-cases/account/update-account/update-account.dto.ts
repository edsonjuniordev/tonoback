import { AccountType } from "@application/domain/entities/account.entity";
import { AccountRepository } from "@application/repository/account.repository";

export type UpdateAccountBuildDto = {
  accountRepository: AccountRepository
}

export type UpdateAccountInputDto = {
  id: string;
  name: string;
  balance: number;
  color: string;
  userId: string;
  type: AccountType;
}

export type UpdateAccountOutputDto = {
  id: string;
  userId: string;
  name: string;
  balance: number;
  color: string;
  type: AccountType;
  createdAt: Date;
  updatedAt: Date;
}