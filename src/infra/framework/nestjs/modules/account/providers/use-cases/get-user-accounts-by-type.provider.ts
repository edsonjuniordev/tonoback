import { Inject, Injectable } from "@nestjs/common"
import { GetUserAccountsByTypeUseCase } from "@application/use-cases/account/get-user-accounts-by-type/get-user-accounts-by-type.use-case"
import { AccountRepository } from "@application/repository/account.repository"
import { GetUserAccountsByTypeInputDto, GetUserAccountsByTypeOutputDto } from "@application/use-cases/account/get-user-accounts-by-type/get-user-accounts-by-type.dto"
import { AccountBalancePercentage } from "@application/domain/strategies/account-balance-percentage.strategy"

@Injectable()
export class GetUserAccountsByTypeUseCaseProvider {
  private useCase: GetUserAccountsByTypeUseCase

  constructor(
    @Inject('AccountRepository') private readonly accountRepository: AccountRepository,
    @Inject('AccountBalancePercentage') private readonly accountBalancePercentageStrategy: AccountBalancePercentage
  ) {
    const useCase = GetUserAccountsByTypeUseCase.build({
      accountRepository,
      accountBalancePercentageStrategy
    })

    this.useCase = useCase
  }

  public async execute(input: GetUserAccountsByTypeInputDto): Promise<GetUserAccountsByTypeOutputDto> {
    return this.useCase.execute(input)
  }
}