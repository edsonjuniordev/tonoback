import { Account } from "../domain/entities/account.entity";

export interface AccountRepository {
  create(account: Account): Promise<void>;
  findById(id: string): Promise<Account>;
  update(account: Account): Promise<void>;
  findByUserId(userId: string): Promise<Account[]>;
  delete(id: string): Promise<void>;
}