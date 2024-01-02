import { IsEnum, IsHexColor, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { AccountType } from "../entities/account"

export class CreateAccountDto {
    constructor(createAccountDto?: CreateAccountDto) {
        this.name = createAccountDto?.name
        this.balance = createAccountDto?.balance
        this.color = createAccountDto?.color
        this.type = createAccountDto?.type
    }

    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    balance: number

    @IsHexColor()
    @IsNotEmpty()
    color: string

    @IsNotEmpty()
    @IsEnum(AccountType)
    type: AccountType
}
