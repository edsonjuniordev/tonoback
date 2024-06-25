import { Account, AccountType } from "../domain/entities/account.entity";

export interface AccountRepository {
  create(account: Account): Promise<void>;
  findById(id: string, userId: string): Promise<Account>;
  update(account: Account): Promise<void>;
  findByUserId(userId: string): Promise<Account[]>;
  findByUserIdAndType(userId: string, type: AccountType): Promise<Account[]>;
  delete(id: string, userId: string): Promise<void>;
}