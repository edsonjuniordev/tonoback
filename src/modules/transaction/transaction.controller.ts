import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { IsActiveUserId } from '../../shared/decorators/is.active.user.id';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@IsActiveUserId() userId: string, @Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(userId, createTransactionDto);
  }

  @Get()
  findAll(@IsActiveUserId() userId: string) {
    return this.transactionService.findAllByUserId(userId);
  }

  @Get(':transactionId')
  findOne(@IsActiveUserId() userId: string, @Param('transactionId') transactionId: string) {
    return this.transactionService.findOneByIdAndUserId(transactionId, userId);
  }
}
