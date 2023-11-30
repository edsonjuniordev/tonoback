import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class AccountRepository {
    constructor(private readonly prismaService: PrismaService) { }

    create(createArgs: Prisma.AccountCreateArgs) {
        return this.prismaService.account.create(createArgs)
    }

    findMany(findManyArgs: Prisma.AccountFindManyArgs) {
        return this.prismaService.account.findMany(findManyArgs)
    }

    findFirst(findFirstArgs: Prisma.AccountFindFirstArgs) {
        return this.prismaService.account.findFirst(findFirstArgs)
    }

    update(updateArgs: Prisma.AccountUpdateArgs) {
        return this.prismaService.account.update(updateArgs)
    }

    delete(deleteArgs: Prisma.AccountDeleteArgs) {
        return this.prismaService.account.delete(deleteArgs)
    }
}