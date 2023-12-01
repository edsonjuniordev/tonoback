import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class TransactionRepository {
    constructor(private readonly prismaService: PrismaService) { }

    create(createArgs: Prisma.TransactionCreateArgs) {
        return this.prismaService.transaction.create(createArgs);
    }

    findMany(findManyArgs: Prisma.TransactionFindManyArgs) {
        return this.prismaService.transaction.findMany(findManyArgs)
    }

    findUnique(findUniqueArgs: Prisma.TransactionFindUniqueArgs) {
        return this.prismaService.transaction.findUnique(findUniqueArgs)
    }
}