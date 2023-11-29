import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SigninDto {
    constructor(signupDto?: Partial<SigninDto> ){
        this.email = signupDto?.email
        this.password = signupDto?.password
    }

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}