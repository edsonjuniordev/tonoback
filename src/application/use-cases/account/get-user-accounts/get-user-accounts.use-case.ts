import { UseCase } from "@application/domain/use-cases/use-case";
import { AccountRepository } from "@application/repository/account.repository";
import { GetUserAccountsBuildDto, GetUserAccountsInputDto, GetUserAccountsOutputDto } from "./get-user-accounts.dto";
import { AccountBalancePercentage } from "@application/domain/strategies/account-balance-percentage.strategy";
import { CalculateAccountsAmount } from "../@shared/calculate-accounts-amount";
import { CalculateAccountsWithPositiveBalanceAmount } from "../@shared/calculate-accounts-with-positive-balance-amount.util";

export class GetUserAccountsUseCase implements UseCase<GetUserAccountsInputDto, GetUserAccountsOutputDto> {
  private constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountBalancePercentageStrategy: AccountBalancePercentage
  ) { }

  public static build({
    accountRepository,
    accountBalancePercentageStrategy
  }: GetUserAccountsBuildDto): GetUserAccountsUseCase {
    return new GetUserAccountsUseCase(accountRepository, accountBalancePercentageStrategy);
  }

  public async execute({
    userId
  }: GetUserAccountsInputDto): Promise<GetUserAccountsOutputDto> {
    const userAccounts = await this.accountRepository.findByUserId(userId)

    const accountsAmount = CalculateAccountsAmount.calculate(userAccounts)

    const accountsWithPositiveBalanceAmount = CalculateAccountsWithPositiveBalanceAmount.calculate(userAccounts)

    const output: GetUserAccountsOutputDto = {
      accounts: userAccounts.map((account) => ({
        id: account.id,
        userId: account.userId,
        balance: account.balance,
        color: account.color,
        name: account.name,
        percentage: this.accountBalancePercentageStrategy.calculate(account.balance, accountsWithPositiveBalanceAmount),
        type: account.type,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
      })),
      accountsAmount
    }

    return output;
  }
}