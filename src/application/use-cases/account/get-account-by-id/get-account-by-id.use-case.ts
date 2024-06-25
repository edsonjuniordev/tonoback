import { UseCase } from "@application/domain/use-cases/use-case";
import { AccountRepository } from "@application/repository/account.repository";
import { GetAccountByIdUseCaseBuildDto, GetAccountByIdUseCaseInputDto, GetAccountByIdUseCaseOutputDto } from "./get-account-by-id.dto";

export class GetAccountByIdUseCase implements UseCase<GetAccountByIdUseCaseInputDto, GetAccountByIdUseCaseOutputDto> {
  private constructor(
    private readonly accountRepository: AccountRepository,
  ) { }

  public static build({
    accountRepository
  }: GetAccountByIdUseCaseBuildDto): GetAccountByIdUseCase {
    return new GetAccountByIdUseCase(accountRepository);
  }

  public async execute({
    accountId,
    userId
  }: GetAccountByIdUseCaseInputDto): Promise<GetAccountByIdUseCaseOutputDto> {
    const account = await this.accountRepository.findById(accountId, userId);

    const output: GetAccountByIdUseCaseOutputDto = {
      id: account.id,
      balance: account.balance,
      userId: account.userId,
      color: account.color,
      name: account.name,
      type: account.type,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    }

    return output
  }
}