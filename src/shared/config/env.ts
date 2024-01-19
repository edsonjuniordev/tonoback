import { plainToInstance } from "class-transformer";
import { IsNotEmpty, IsString, validateSync } from "class-validator"

class Env {
    @IsString()
    @IsNotEmpty()
    jwtSecret: string;

    port: string;

    origin: string;
}

export const env: Env = plainToInstance(Env, {
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT,
    origin: process.env.ORIGIN
})
const erros = validateSync(env)
console.log(erros)