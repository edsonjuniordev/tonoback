import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class AccountRepository {
    constructor(private readonly prismaService: PrismaService) { }

    create(createArgs: Prisma.AccountCreateArgs) {
        return this.prismaService.account.create(createArgs)
    }
}