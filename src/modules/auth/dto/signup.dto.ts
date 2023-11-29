import { IsBoolean, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignupDto {
    constructor(signupDto?: Partial<SignupDto> ){
        this.email = signupDto?.email
        this.name = signupDto?.name
        this.password = signupDto?.password
        this.social_login = signupDto?.social_login
    }

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsBoolean()
    @IsNotEmpty()
    social_login: boolean;
}
