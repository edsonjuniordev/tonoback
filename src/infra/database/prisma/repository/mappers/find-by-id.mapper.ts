import { $Enums } from "@prisma/client";
import { Account, AccountType } from "@application/domain/entities/account.entity";

export class FindByIdMapper {
  public static map(
    model: {
      id: string;
      userId: string;
      name: string;
      balance: number;
      color: string;
      type: $Enums.AccountType;
      createdAt: string;
      updatedAt: string;
  }
  ): Account {
    const anEntity = Account.with({
      id: model.id,
      userId: model.userId,
      balance: model.balance,
      color: model.color,
      name: model.name,
      type: model.type as AccountType,
      createdAt: new Date(model.createdAt),
      updatedAt: new Date(model.updatedAt),
    })

    return anEntity;
  }
}