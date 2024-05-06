import { Inject, Injectable } from "@nestjs/common"
import { DeleteAccountUseCase } from "@application/use-cases/account/delete-account/delete-account.use-case"
import { AccountRepository } from "@application/repository/account.repository"
import { DeleteAccountInputDto, DeleteAccountOutputDto } from "@application/use-cases/account/delete-account/delete-account.dto"

@Injectable()
export class DeleteAccountUseCaseProvider {
  private useCase: DeleteAccountUseCase

  constructor(
    @Inject('AccountRepository') private readonly accountRepository: AccountRepository,
  ) {
    const useCase = DeleteAccountUseCase.build({
      accountRepository
    })

    this.useCase = useCase
  }

  public async execute(input: DeleteAccountInputDto): Promise<DeleteAccountOutputDto> {
    return this.useCase.execute(input)
  }
}