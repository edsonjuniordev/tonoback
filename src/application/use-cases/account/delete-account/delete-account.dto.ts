import { AccountRepository } from "@application/repository/account.repository";

export type DeleteAccountBuildDto = {
  accountRepository: AccountRepository;
}

export type DeleteAccountInputDto = {
  id: string;
}

export type DeleteAccountOutputDto = void;