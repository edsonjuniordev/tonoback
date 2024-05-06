import { Account } from "@application/domain/entities/account.entity";
import { AccountRepository } from "@application/repository/account.repository";
import { PrismaService } from "@infra/database/prisma/prisma.service";
import { CreateAccountMapper } from "./mappers/create-account.mapper";
import { Injectable } from "@nestjs/common";
import { FindByUserIdMapper } from "./mappers/find-by-user-id.mapper";
import { FindByIdMapper } from "./mappers/find-by-id.mapper";
import { UpdateAccountMapper } from "./mappers/update-account.mapper";

@Injectable()
export class AccountRepositoryAdapter implements AccountRepository {
  constructor(private readonly prismaService: PrismaService) { }

  public async create(account: Account): Promise<void> {
    const args = CreateAccountMapper.map(account)

    await this.prismaService.account.create(args)
  }

  public async findByUserId(userId: string): Promise<Account[]> {
    const models = await this.prismaService.account.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: "asc"
      }
    })

    const entities = FindByUserIdMapper.map(models)

    return entities
  }

  public async findById(id: string): Promise<Account> {
    const aModel = await this.prismaService.account.findUnique({
      where: {
        id
      }
    })

    const anEntity = FindByIdMapper.map(aModel);

    return anEntity;
  }

  public async update(account: Account): Promise<void> {
    const args = UpdateAccountMapper.map(account);

    await this.prismaService.account.update(args);
  }

  public async delete(id: string): Promise<void> {
    await this.prismaService.account.delete({
      where: {
        id
      }
    });
  }
}