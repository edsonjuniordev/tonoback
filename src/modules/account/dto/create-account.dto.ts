import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateAccountDto {
    constructor(createAccountDto?: CreateAccountDto) {
        this.name = createAccountDto?.name
        this.balance = createAccountDto?.balance
    }

    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    balance: number
}
