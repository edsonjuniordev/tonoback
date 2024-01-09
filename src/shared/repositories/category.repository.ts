import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class CategoryRepository {
    constructor(private readonly prismaService: PrismaService) { }

    create(createArgs: Prisma.CategoryCreateArgs) {
        return this.prismaService.category.create(createArgs);
    }

    findMany(findManyArgs: Prisma.CategoryFindManyArgs) {
        return this.prismaService.category.findMany(findManyArgs);
    }

    findUnique(findUniqueArgs: Prisma.CategoryFindUniqueArgs) {
        return this.prismaService.category.findUnique(findUniqueArgs);
    }

    findFirst(findFirstArgs: Prisma.CategoryFindFirstArgs) {
        return this.prismaService.category.findFirst(findFirstArgs)
    }
}