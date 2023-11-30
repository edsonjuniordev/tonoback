import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    constructor(createCategoryDto?: CreateCategoryDto) {
        this.name = createCategoryDto?.name;
    }

    @IsString()
    @IsNotEmpty()
    name: string;
}
