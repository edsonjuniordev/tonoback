import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { IsActiveUserId } from '@infra/framework/nestjs/decorators/is.active.user.id';
import { CreateAccountUseCase } from '@application/use-cases/account/create-account/create-account.use-case';
import { GetUserAccountsUseCase } from '@application/use-cases/account/get-user-accounts/get-user-accounts.use-case';
import { UpdateAccountUseCase } from '@application/use-cases/account/update-account/update-account.use-case';
import { DeleteAccountUseCase } from '@application/use-cases/account/delete-account/delete-account.use-case';
import { AccountType } from '@application/domain/entities/account.entity';
import { GetUserAccountsByTypeUseCase } from '@application/use-cases/account/get-user-accounts-by-type/get-user-accounts-by-type.use-case';
import { GetAccountByIdUseCase } from '../../../../../application/use-cases/account/get-account-by-id/get-account-by-id.use-case';

@Controller('accounts')
export class AccountController {
  constructor(
    private readonly createAccount: CreateAccountUseCase,
    private readonly getUserAccounts: GetUserAccountsUseCase,
    private readonly getUserAccountsByType: GetUserAccountsByTypeUseCase,
    private readonly updateAccount: UpdateAccountUseCase,
    private readonly deleteAccount: DeleteAccountUseCase,
    private readonly getAccountById: GetAccountByIdUseCase
  ) { }

  @Post()
  create(@IsActiveUserId() userId: string, @Body() createAccountDto: CreateAccountDto) {
    return this.createAccount.execute({
      balance: createAccountDto.balance,
      color: createAccountDto.color,
      name: createAccountDto.name,
      type: createAccountDto.type,
      userId
    });
  }

  @Get()
  findAll(
    @IsActiveUserId() userId: string,
    @Query('type') type: string
  ) {

    if (type) {
      const typeToUpper = type.toUpperCase()

      return this.getUserAccountsByType.execute({
        userId,
        type: typeToUpper as AccountType
      })
    }

    return this.getUserAccounts.execute({
      userId
    });
  }

  @Get(':accountId')
  getAccout(@Param('accountId') accountId: string, @IsActiveUserId() userId: string) {
    return this.getAccountById.execute({
      accountId,
      userId
    })
  }

  @Patch(':accountId')
  update(@Param('accountId') accountId: string, @IsActiveUserId() userId: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.updateAccount.execute({
      id: accountId,
      userId,
      balance: updateAccountDto.balance,
      color: updateAccountDto.color,
      name: updateAccountDto.name,
      type: updateAccountDto.type
    })
  }

  @Delete(':accountId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('accountId') accountId: string, @IsActiveUserId() userId: string) {
    return this.deleteAccount.execute({
      id: accountId,
      userId
    })
  }
}
