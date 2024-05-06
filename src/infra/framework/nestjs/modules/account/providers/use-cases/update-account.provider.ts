import { Inject, Injectable } from "@nestjs/common";
import { UpdateAccountUseCase } from "@application/use-cases/account/update-account/update-account.use-case";
import { AccountRepository } from "@application/repository/account.repository";
import { UpdateAccountInputDto, UpdateAccountOutputDto } from "@application/use-cases/account/update-account/update-account.dto";

@Injectable()
export class UpdateAccountUseCaseProvider {
  private useCase: UpdateAccountUseCase

  constructor(
    @Inject('AccountRepository') private readonly accountRepository: AccountRepository,
  ) {
    const useCase = UpdateAccountUseCase.build({
      accountRepository
    })

    this.useCase = useCase
  }

  public async execute(input: UpdateAccountInputDto): Promise<UpdateAccountOutputDto> {
    return this.useCase.execute(input)
  }
}