import { Account } from "@application/domain/entities/account.entity";

export class CalculateAccountsAmount {
  public static calculate(accounts: Account[]): number {
    const amount = accounts.reduce((acc, account) => acc += account.balance, 0)

    return amount;
  }
}