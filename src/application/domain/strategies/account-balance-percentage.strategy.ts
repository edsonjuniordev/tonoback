export interface AccountBalancePercentage {
  calculate(accountBalance: number, totalBalance: number): number;
}