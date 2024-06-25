import { Inject, Injectable } from "@nestjs/common";
import { GetUserAccountsUseCase } from "@application/use-cases/account/get-user-accounts/get-user-accounts.use-case";
import { AccountRepository } from "@application/repository/account.repository";
import { GetUserAccountsInputDto, GetUserAccountsOutputDto } from "@application/use-cases/account/get-user-accounts/get-user-accounts.dto";
import { AccountBalancePercentage } from "@application/domain/strategies/account-balance-percentage.strategy";

@Injectable()
export class GetUserAccountsUseCaseProvider {
  private useCase: GetUserAccountsUseCase

  constructor(
    @Inject('AccountRepository') private readonly accountRepository: AccountRepository,
    @Inject('AccountBalancePercentage') private readonly accountBalancePercentageStrategy: AccountBalancePercentage
  ) {
    const useCase = GetUserAccountsUseCase.build({
      accountRepository,
      accountBalancePercentageStrategy
    })

    this.useCase = useCase
  }

  public async execute(input: GetUserAccountsInputDto): Promise<GetUserAccountsOutputDto> {
    return this.useCase.execute(input)
  }
}