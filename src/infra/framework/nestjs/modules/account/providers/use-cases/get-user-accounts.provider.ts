import { Inject, Injectable } from "@nestjs/common";
import { GetUserAccountsUseCase } from "@application/use-cases/account/get-user-accounts/get-user-accounts.use-case";
import { AccountRepository } from "@application/repository/account.repository";
import { GetUserAccountsInputDto, GetUserAccountsOutputDto } from "@application/use-cases/account/get-user-accounts/get-user-accounts.dto";

@Injectable()
export class GetUserAccountsUseCaseProvider {
  private useCase: GetUserAccountsUseCase

  constructor(
    @Inject('AccountRepository') private readonly accountRepository: AccountRepository,
  ) {
    const useCase = GetUserAccountsUseCase.build({
      accountRepository
    })

    this.useCase = useCase
  }

  public async execute(input: GetUserAccountsInputDto): Promise<GetUserAccountsOutputDto> {
    return this.useCase.execute(input)
  }
}