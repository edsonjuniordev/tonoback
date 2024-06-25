import { AccountBalancePercentage } from "@application/domain/strategies/account-balance-percentage.strategy";

export class SimpleAccountBalancePercentage implements AccountBalancePercentage {
  calculate(accountBalance: number, totalBalance: number): number {
    const percentage = (accountBalance / totalBalance) * 100;

    if (percentage > 0) return this.roundPercentage(percentage);

    return 0
  }

  private roundPercentage(percentage: number): number {
    const decimalTreshHold = 0.5;
    const decimalPart = percentage - Math.floor(percentage);

    if (decimalPart >= decimalTreshHold) {
      return Math.ceil(percentage);
    } else {
      return Math.floor(percentage);
    }
  }
}