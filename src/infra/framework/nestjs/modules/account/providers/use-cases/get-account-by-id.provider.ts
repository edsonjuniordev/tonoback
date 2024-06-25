import { Inject, Injectable } from "@nestjs/common"
import { GetAccountByIdUseCase } from "../../../../../../../application/use-cases/account/get-account-by-id/get-account-by-id.use-case"
import { AccountRepository } from "../../../../../../../application/repository/account.repository"
import { GetAccountByIdUseCaseInputDto, GetAccountByIdUseCaseOutputDto } from "../../../../../../../application/use-cases/account/get-account-by-id/get-account-by-id.dto"

@Injectable()
export class GetAccountByIdUseCaseProvider {
  private useCase: GetAccountByIdUseCase

  constructor(
    @Inject('AccountRepository') private readonly accountRepository: AccountRepository
  ) {
    const useCase = GetAccountByIdUseCase.build({
      accountRepository
    })

    this.useCase = useCase
  }

  public execute(input: GetAccountByIdUseCaseInputDto): Promise<GetAccountByIdUseCaseOutputDto> {
    return this.useCase.execute(input)
  }
}