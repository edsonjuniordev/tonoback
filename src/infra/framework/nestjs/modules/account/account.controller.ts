import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { IsActiveUserId } from '@infra/framework/nestjs/decorators/is.active.user.id';
import { CreateAccountUseCase } from '@application/use-cases/account/create-account/create-account.use-case';
import { GetUserAccountsUseCase } from '@application/use-cases/account/get-user-accounts/get-user-accounts.use-case';
import { UpdateAccountUseCase } from '@application/use-cases/account/update-account/update-account.use-case';
import { DeleteAccountUseCase } from '@application/use-cases/account/delete-account/delete-account.use-case';

@Controller('accounts')
export class AccountController {
  constructor(
    private readonly createAccount: CreateAccountUseCase,
    private readonly getUserAccounts: GetUserAccountsUseCase,
    private readonly updateAccount: UpdateAccountUseCase,
    private readonly deleteAccount: DeleteAccountUseCase
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
  findAll(@IsActiveUserId() userId: string) {
    return this.getUserAccounts.execute({
      userId
    });
  }

  @Patch(':accountId')
  update(@Param('accountId') accountId: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.updateAccount.execute({
      id: accountId,
      balance: updateAccountDto.balance,
      color: updateAccountDto.color,
      name: updateAccountDto.name,
      type: updateAccountDto.type
    })
  }

  @Delete(':accountId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('accountId') accountId: string) {
    return this.deleteAccount.execute({
      id: accountId,
    })
  }
}
