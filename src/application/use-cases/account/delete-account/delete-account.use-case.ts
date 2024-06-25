import { UseCase } from "@application/domain/use-cases/use-case";
import { AccountNotFoundException } from "@application/exceptions/account-not-found.exception";
import { AccountRepository } from "@application/repository/account.repository";
import { DeleteAccountBuildDto, DeleteAccountInputDto, DeleteAccountOutputDto } from "./delete-account.dto";

export class DeleteAccountUseCase implements UseCase<DeleteAccountInputDto, DeleteAccountOutputDto> {
  private constructor(
    private accountRepository: AccountRepository
  ) { }

  public static build({
    accountRepository
  }: DeleteAccountBuildDto): DeleteAccountUseCase {
    return new DeleteAccountUseCase(accountRepository)
  }

  public async execute({
    id,
    userId
  }: DeleteAccountInputDto): Promise<void> {
    const account = await this.accountRepository.findById(id, userId);

    if (!account) throw new AccountNotFoundException(`Account ${id} not found`);

    await this.accountRepository.delete(id, userId);
  }
}