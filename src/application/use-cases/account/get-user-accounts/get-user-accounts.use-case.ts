import { UseCase } from "@application/domain/use-cases/use-case";
import { AccountRepository } from "@application/repository/account.repository";
import { GetUserAccountsBuildDto, GetUserAccountsInputDto, GetUserAccountsOutputDto } from "./get-user-accounts.dto";

export class GetUserAccountsUseCase implements UseCase<GetUserAccountsInputDto, GetUserAccountsOutputDto> {
  private constructor(
    private readonly accountRepository: AccountRepository
  ) { }

  public static build({
    accountRepository
  }: GetUserAccountsBuildDto): GetUserAccountsUseCase {
    return new GetUserAccountsUseCase(accountRepository);
  }

  public async execute({
    userId
  }: GetUserAccountsInputDto): Promise<GetUserAccountsOutputDto> {
    const userAccounts = await this.accountRepository.findByUserId(userId)

    const output: GetUserAccountsOutputDto = userAccounts.map((account) => ({
      id: account.id,
      userId: account.userId,
      balance: account.balance,
      color: account.color,
      name: account.name,
      type: account.type,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt
    }))

    return output;
  }
}