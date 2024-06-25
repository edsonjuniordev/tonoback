import { AccountRepository } from "@application/repository/account.repository"
import { AccountType } from "@application/domain/entities/account.entity";
import { AccountBalancePercentage } from "@application/domain/strategies/account-balance-percentage.strategy";

export type GetUserAccountsByTypeBuildDto = {
  accountRepository: AccountRepository
  accountBalancePercentageStrategy: AccountBalancePercentage
}

export type GetUserAccountsByTypeInputDto = {
  userId: string;
  type: AccountType
}

export type GetUserAccountsByTypeOutputDto = {
  accountsAmount: number;
  accounts: {
    id: string;
    userId: string;
    name: string;
    balance: number;
    color: string;
    percentage: number;
    type: AccountType;
    createdAt: Date;
    updatedAt: Date;
  }[];
}