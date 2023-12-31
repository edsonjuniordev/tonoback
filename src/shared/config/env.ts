import { plainToInstance } from "class-transformer";
import { IsNotEmpty, IsString, validateSync } from "class-validator"

class Env {
    @IsString()
    @IsNotEmpty()
    jwtSecret: string;
}

export const env: Env = plainToInstance(Env, {
    jwtSecret: process.env.JWT_SECRET,
})
const erros = validateSync(env)
console.log(erros)