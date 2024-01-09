import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AccountService } from './services/account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { IsActiveUserId } from '../../shared/decorators/is.active.user.id';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Post()
  create(@IsActiveUserId() userId: string, @Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(userId, createAccountDto);
  }

  @Get()
  findAll(@IsActiveUserId() userId: string) {
    return this.accountService.findAllByUserId(userId);
  }

  @Patch(':accountId')
  update(@IsActiveUserId() userId: string, @Param('accountId') accountId: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(accountId, userId, updateAccountDto);
  }

  @Delete(':accountId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@IsActiveUserId() userId: string, @Param('accountId') accountId: string) {
    return this.accountService.delete(accountId, userId);
  }
}
