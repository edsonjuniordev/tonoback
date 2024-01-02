import { IsNotEmpty, IsString } from "class-validator";
import { TransactionType } from "../../transaction/entities/transaction";

export class CreateCategoryDto {
    constructor(createCategoryDto?: CreateCategoryDto) {
        this.name = createCategoryDto?.name;
        this.type = createCategoryDto?.type
    }

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    type: TransactionType
}
