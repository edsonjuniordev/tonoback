import { Prisma } from "@prisma/client";
import { Account } from "@application/domain/entities/account.entity";

export class CreateAccountMapper {
  public static map({
    id,
    userId,
    balance,
    color,
    name,
    type,
    createdAt,
    updatedAt
  }: Account): Prisma.AccountCreateArgs {
    const args: Prisma.AccountCreateArgs = {
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