import { Account } from "@application/domain/entities/account.entity";
import { Prisma } from "@prisma/client";

export class UpdateAccountMapper {
  public static map({
    id,
    userId,
    balance,
    color,
    name,
    type,
    createdAt,
    updatedAt
  }: Account): Prisma.AccountUpdateArgs {
    const args: Prisma.AccountUpdateArgs = {
      where: {
        id
      },
      data: {
        id,
        userId,
        name,
        balance,
        color,
        type,
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
      }
    }

    return args;
  }
}