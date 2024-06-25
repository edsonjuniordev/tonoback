import { Account } from "@application/domain/entities/account.entity";

export class CalculateAccountsWithPositiveBalanceAmount {
  public static calculate(accounts: Account[]) {
    const amount = accounts.reduce((acc, account) => {
      if (account.balance > 0) {
        acc += account.balance
        return acc
      }

      return acc
    }, 0)

    return amount;
  }
}