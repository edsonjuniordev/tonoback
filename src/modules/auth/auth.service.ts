import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt'
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { UserRepository } from '../../shared/repositories/user.repository';

@Injectable()
export class AuthService {
    constructor(private readonly userRepository: UserRepository, private readonly jwtService: JwtService) { }

    async signin(singinDto: SigninDto) {
        const { email, password } = singinDto

        const user = await this.userRepository.findUnique({
            where: { email }
        })

        if (!user) {
            throw new UnauthorizedException('invalid credentials')
        }

        const isPasswordValid = await compare(password, user.password)

        if (!isPasswordValid) {
            throw new UnauthorizedException('invalid credentials')
        }

        const accessToken = await this.generateAccessToken(user.id)

        return {
            access_token: accessToken
        }
    }

    async signup(signupDto: SignupDto) {
        const { email, password, name, social_login } = signupDto
        const emailCreated = await this.userRepository.findUnique({
            where: { email }
        })

        if (emailCreated) {
            throw new ConflictException('email already in use')
        }

        const hashedPassword = await hash(password, 12)
        const now = new Date

        const userCreated = await this.userRepository.create({
            data: {
                email,
                name,
                social_login: social_login || false,
                password: hashedPassword,
                createdAt: now.toISOString(),
                updatedAt: now.toISOString(),
                categories: {
                    createMany: {
                        data: [
                            // Income
                            { name: 'Salário', type: 'IN' },
                            { name: 'Freelance', type: 'IN' },
                            { name: 'Outro', type: 'IN' },
                            // Expense
                            { name: 'Casa', type: 'OUT' },
                            { name: 'Alimentação', type: 'OUT' },
                            { name: 'Educação', type: 'OUT' },
                            { name: 'Lazer', type: 'OUT' },
                            { name: 'Mercado', type: 'OUT' },
                            { name: 'Roupas', type: 'OUT' },
                            { name: 'Transporte', type: 'OUT' },
                            { name: 'Viagem', type: 'OUT' },
                            { name: 'Outro', type: 'OUT' },
                        ],
                    },
                },
            }
        })

        const accessToken = await this.generateAccessToken(userCreated.id)

        return {
            access_token: accessToken
        };
    }

    generateAccessToken(userId: string): Promise<String> {
        return this.jwtService.signAsync({ sub: userId })
    }
}
