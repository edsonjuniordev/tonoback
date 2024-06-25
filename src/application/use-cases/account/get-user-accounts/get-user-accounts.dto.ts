import { AccountRepository } from "@application/repository/account.repository"
import { AccountType } from "@application/domain/entities/account.entity";
import { AccountBalancePercentage } from "@application/domain/strategies/account-balance-percentage.strategy";

export type GetUserAccountsBuildDto = {
  accountRepository: AccountRepository
  accountBalancePercentageStrategy: AccountBalancePercentage
}

export type GetUserAccountsInputDto = {
  userId: string;
}

export type GetUserAccountsOutputDto = {
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