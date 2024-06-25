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
import { GetUserAccountsByTypeUseCase } from "@application/use-cases/account/get-user-accounts-by-type/get-user-accounts-by-type.use-case";
import { GetUserAccountsByTypeUseCaseProvider } from "./use-cases/get-user-accounts-by-type.provider";
import { SimpleAccountBalancePercentage } from "@application/use-cases/account/strategies/account-balance-percentage.strategy";
import { GetAccountByIdUseCaseProvider } from "./use-cases/get-account-by-id.provider";
import { GetAccountByIdUseCase } from "@application/use-cases/account/get-account-by-id/get-account-by-id.use-case";

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

const getUserAccountsByTypeUseCase: Provider = {
  provide: GetUserAccountsByTypeUseCase,
  useClass: GetUserAccountsByTypeUseCaseProvider
}

const accountRepository: Provider = {
  provide: 'AccountRepository',
  useClass: AccountRepositoryAdapter
}

const accountBalancePercentage: Provider = {
  provide: 'AccountBalancePercentage',
  useClass: SimpleAccountBalancePercentage
}

const getAccountById: Provider = {
  provide: GetAccountByIdUseCase,
  useClass: GetAccountByIdUseCaseProvider
}

export const providers = [
  createAccountUseCase,
  getUserAccountsUseCase,
  updateAccountUseCase,
  deleteAccountUseCase,
  getUserAccountsByTypeUseCase,
  accountRepository,
  accountBalancePercentage,
  getAccountById
]