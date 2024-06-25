import { UseCase } from "@application/domain/use-cases/use-case";
import { AccountRepository } from "@application/repository/account.repository";
import { GetUserAccountsByTypeBuildDto, GetUserAccountsByTypeInputDto, GetUserAccountsByTypeOutputDto } from "./get-user-accounts-by-type.dto";
import { CalculateAccountsAmount } from "../@shared/calculate-accounts-amount";
import { CalculateAccountsWithPositiveBalanceAmount } from "../@shared/calculate-accounts-with-positive-balance-amount.util";
import { AccountBalancePercentage } from "@application/domain/strategies/account-balance-percentage.strategy";

export class GetUserAccountsByTypeUseCase implements UseCase<GetUserAccountsByTypeInputDto, GetUserAccountsByTypeOutputDto> {
  private constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountBalancePercentageStrategy: AccountBalancePercentage
  ) { }

  public static build({
    accountRepository,
    accountBalancePercentageStrategy
  }: GetUserAccountsByTypeBuildDto): GetUserAccountsByTypeUseCase {
    return new GetUserAccountsByTypeUseCase(accountRepository, accountBalancePercentageStrategy);
  }

  public async execute({
    userId,
    type
  }: GetUserAccountsByTypeInputDto): Promise<GetUserAccountsByTypeOutputDto> {
    const userAccounts = await this.accountRepository.findByUserIdAndType(userId, type);

    const accountsAmount = CalculateAccountsAmount.calculate(userAccounts)

    const accountsWithPositiveBalanceAmount = CalculateAccountsWithPositiveBalanceAmount.calculate(userAccounts)

    const output: GetUserAccountsByTypeOutputDto = {
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