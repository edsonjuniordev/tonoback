import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ParseEnumPipe, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { TransactionService } from './services/transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { IsActiveUserId } from '../../shared/decorators/is.active.user.id';
import { OptionalParseUUIDPipe } from '../../shared/pipes/OptionalParseUUIDPipe';
import { TransactionType } from './entities/transaction';
import { OptionalParseEnumPipe } from '../../shared/pipes/OptionalParseEnumPipe';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @Post()
  create(@IsActiveUserId() userId: string, @Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(userId, createTransactionDto);
  }

  @Get()
  findAll(@IsActiveUserId() userId: string, @Query('month', ParseIntPipe) month: number, @Query('year', ParseIntPipe) year: number, @Query('accountId', OptionalParseUUIDPipe) accountId: string, @Query('type', new OptionalParseEnumPipe(TransactionType)) type: TransactionType) {
    return this.transactionService.findAllByUserId(userId, { month, year, accountId, type });
  }

  @Get(':transactionId')
  findOne(@IsActiveUserId() userId: string, @Param('transactionId') transactionId: string) {
    return this.transactionService.findOneByIdAndUserId(transactionId, userId);
  }

  @Put(':transactionId')
  update(@IsActiveUserId() userId: string, @Param('transactionId') transactionId: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(userId, transactionId, updateTransactionDto)
  }

  @Delete(':transactionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@IsActiveUserId() userId: string, @Param('transactionId') transactionId: string) {
    return this.transactionService.delete(transactionId, userId);
  }
}
