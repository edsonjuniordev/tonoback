import { UseCase } from "@application/domain/use-cases/use-case";
import { CreateAccountBuildDto, CreateAccountInputDto, CreateAccountOutputDto } from "./create-account.dto";
import { AccountRepository } from "@application/repository/account.repository";
import { Account } from "@application/domain/entities/account.entity";

export class CreateAccountUseCase implements UseCase<CreateAccountInputDto, CreateAccountOutputDto> {
  private constructor(
    private accountRepository: AccountRepository
  ) { }

  public static build({
    accountRepository
  }: CreateAccountBuildDto): CreateAccountUseCase {
    return new CreateAccountUseCase(accountRepository)
  }

  public async execute({
    userId,
    name,
    balance,
    color,
    type,
  }: CreateAccountInputDto): Promise<CreateAccountOutputDto> {

    const account = Account.create({
      userId,
      balance,
      color,
      name,
      type
    })

    await this.accountRepository.create(account);

    const output: CreateAccountOutputDto = {
      id: account.id,
      balance: account.balance,
      color: account.color,
      name: account.name,
      type: account.type,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt
    }

    return output;
  }
}