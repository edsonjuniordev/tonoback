import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class UserRepository {
    constructor(private readonly prismaService: PrismaService) { }

    create(createArgs: Prisma.UserCreateArgs) {
        return this.prismaService.user.create(createArgs)
    }

    findUnique(findUniqueArgs: Prisma.UserFindUniqueArgs) {
        return this.prismaService.user.findUnique(findUniqueArgs)
    } 
}