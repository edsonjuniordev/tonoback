import { UseCase } from "@application/domain/use-cases/use-case";
import { AccountRepository } from "@application/repository/account.repository";
import { UpdateAccountBuildDto, UpdateAccountInputDto, UpdateAccountOutputDto } from "./update-account.dto";
import { AccountNotFoundException } from "@application/exceptions/account-not-found.exception";

export class UpdateAccountUseCase implements UseCase<UpdateAccountInputDto, UpdateAccountOutputDto> {
  private constructor(
    private accountRepository: AccountRepository
  ) { }

  public static build({
    accountRepository
  }: UpdateAccountBuildDto): UpdateAccountUseCase {
    return new UpdateAccountUseCase(accountRepository)
  }

  public async execute({
    id,
    userId,
    balance,
    color,
    name,
    type,
  }: UpdateAccountInputDto): Promise<UpdateAccountOutputDto> {
    const account = await this.accountRepository.findById(id, userId);

    if (!account) throw new AccountNotFoundException(`Account ${id} not found`);

    account.setName(name);
    account.setBalance(balance);
    account.setColor(color);
    account.setType(type);

    await this.accountRepository.update(account);

    const output: UpdateAccountOutputDto = {
      id,
      userId: account.userId,
      balance,
      color,
      name,
      type,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    }

    return output;
  }
}