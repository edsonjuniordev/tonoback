import { plainToInstance } from "class-transformer";
import { IsNotEmpty, IsString, validateSync } from "class-validator"

class Env {
    @IsString()
    @IsNotEmpty()
    jwtSecret: string;

    port: string;

    origin: string;

    rateLimitTTL: number;

    rateLimitRequests: number;
}

export const env: Env = plainToInstance(Env, {
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT,
    origin: process.env.ORIGIN,
    rateLimitTTL: Number(process.env.RATE_LIMIT_TTL),
    rateLimitRequests: Number(process.env.RATE_LIMIT_REQUESTS)
})

const erros = validateSync(env)
console.log(erros)