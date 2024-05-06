import { Inject, Injectable } from "@nestjs/common";
import { AccountRepository } from "@application/repository/account.repository";
import { CreateAccountUseCase } from "@application/use-cases/account/create-account/create-account.use-case";
import { CreateAccountInputDto, CreateAccountOutputDto } from "@application/use-cases/account/create-account/create-account.dto";

@Injectable()
export class CreateAccountUseCaseProvider {
  private useCase: CreateAccountUseCase

  constructor(
    @Inject('AccountRepository') private readonly accountRepository: AccountRepository,
  ) {
    const useCase = CreateAccountUseCase.build({
      accountRepository
    })

    this.useCase = useCase
  }

  public async execute(input: CreateAccountInputDto): Promise<CreateAccountOutputDto> {
    return this.useCase.execute(input)
  }
}