import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateTransactionDto {
    constructor(createTransactionDto?: CreateTransactionDto) {
        this.accountId = createTransactionDto?.accountId
        this.categoryId = createTransactionDto?.categoryId
        this.type = createTransactionDto?.type
        this.description = createTransactionDto?.description
        this.value = createTransactionDto?.value
    }

    @IsNotEmpty()
    @IsUUID()
    accountId: string;

    @IsNotEmpty()
    @IsUUID()
    categoryId: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    value: number;
}
