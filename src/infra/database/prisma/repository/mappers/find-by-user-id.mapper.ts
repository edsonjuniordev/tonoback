import { $Enums } from "@prisma/client";
import { Account, AccountType } from "@application/domain/entities/account.entity";

export class FindByUserIdMapper {
  public static map(
    models: {
      id: string;
      userId: string;
      name: string;
      balance: number;
      color: string;
      type: $Enums.AccountType;
      createdAt: string;
      updatedAt: string;
    }[]
  ): Account[] {
    const entities = models.map((model) => Account.with({
      id: model.id,
      userId: model.userId,
      balance: model.balance,
      color: model.color,
      name: model.name,
      type: model.type as AccountType,
      createdAt: new Date(model.createdAt),
      updatedAt: new Date(model.updatedAt),
    }))

    return entities;
  }
}