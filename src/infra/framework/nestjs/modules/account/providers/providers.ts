import { Provider } from "@nestjs/common";
import { CreateAccountUseCase } from "@application/use-cases/account/create-account/create-account.use-case";
import { CreateAccountUseCaseProvider } from "./use-cases/create-account.provider";
import { AccountRepositoryAdapter } from "@infra/database/prisma/repository/account.repository";
import { GetUserAccountsUseCase } from "@application/use-cases/account/get-user-accounts/get-user-accounts.use-case";
import { GetUserAccountsUseCaseProvider } from "./use-cases/get-user-accounts.provider";
import { UpdateAccountUseCaseProvider } from "./use-cases/update-account.provider";
import { UpdateAccountUseCase } from "@application/use-cases/account/update-account/update-account.use-case";
import { DeleteAccountUseCase } from "@application/use-cases/account/delete-account/delete-account.use-case";
import { DeleteAccountUseCaseProvider } from "./use-cases/delete-account.provider";

const createAccountUseCase: Provider = {
  provide: CreateAccountUseCase,
  useClass: CreateAccountUseCaseProvider
}

const getUserAccountsUseCase: Provider = {
  provide: GetUserAccountsUseCase,
  useClass: GetUserAccountsUseCaseProvider
}

const updateAccountUseCase: Provider = {
  provide: UpdateAccountUseCase,
  useClass: UpdateAccountUseCaseProvider
}

const deleteAccountUseCase: Provider = {
  provide: DeleteAccountUseCase,
  useClass: DeleteAccountUseCaseProvider
}

const accountRepository: Provider = {
  provide: 'AccountRepository',
  useClass: AccountRepositoryAdapter
}

export const providers = [
  createAccountUseCase,
  getUserAccountsUseCase,
  updateAccountUseCase,
  deleteAccountUseCase,
  accountRepository
]