import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { TransactionType } from "../entities/transaction";

export class CreateTransactionDto {
    constructor(createTransactionDto?: CreateTransactionDto) {
        this.accountId = createTransactionDto?.accountId
        this.categoryId = createTransactionDto?.categoryId
        this.type = createTransactionDto?.type
        this.description = createTransactionDto?.description
        this.value = createTransactionDto?.value
        this.transactionDate = createTransactionDto?.transactionDate
    }

    @IsNotEmpty()
    @IsUUID()
    accountId: string;

    @IsNotEmpty()
    @IsUUID()
    categoryId: string;

    @IsString()
    @IsNotEmpty()
    type: TransactionType;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    value: number;

    @IsString()
    @IsNotEmpty()
    transactionDate: string;
}
