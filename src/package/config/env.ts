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

    emailHost: string;

    emailUserSecret: string;

    emailPassSecret: string;

    emailSender: string;

    emailSubject: string;
}

export const env: Env = plainToInstance(Env, {
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT,
    origin: process.env.ORIGIN,
    rateLimitTTL: Number(process.env.RATE_LIMIT_TTL),
    rateLimitRequests: Number(process.env.RATE_LIMIT_REQUESTS),
    emailHost: process.env.EMAIL_HOST,
    emailUserSecret: process.env.EMAIL_USER_SECRET,
    emailPassSecret: process.env.EMAIL_PASS_SECRET,
    emailSender: process.env.EMAIL_SENDER,
    emailSubject: process.env.EMAIL_SUBJECT,
})

const erros = validateSync(env)
console.log(erros)