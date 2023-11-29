import { Test, TestingModule } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { UserRepository } from "../../shared/repositories/user.repository"
import { JwtService } from "@nestjs/jwt"
import { SignupDto } from "./dto/signup.dto"
import { SigninDto } from "./dto/signin.dto"

const accessToken = {
    access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNDBlNWE4OC1kMTJmLTQ5ZmItYWZlYi02MGUzNzNmMzk0YTMiLCJpYXQiOjE3MDA1MDUwNzAsImV4cCI6MTcwMTEwOTg3MH0.kSulgpb-z5dSNc1h58BTN_kARvKs_wCaZNRylTJD-3A"
}

const signupDto = new SignupDto({
    name: "User 1",
    email: "user1@email.com",
    password: "12345678",
    social_login: false
})

const signinDto = new SigninDto({
    email: "user1@email.com",
    password: "12345678",
})

const user = {
    id: "e40e5a88-d12f-49fb-afeb-60e373f394a3",
    email: "ed@email.com",
    password: "$2a$12$uR09n2ZL/4HRRJLmPRWpEerUdGnjnD32//AHyWY5tQqoMaUxXsIMW",
    name: "Ed",
    social_login: false,
    created_at: "2023-11-15T23:20:11.476Z",
    updated_at: "2023-11-15T23:20:11.476Z",
}

describe("AuthService", () => {
    let authService: AuthService
    let userRepository: UserRepository
    let jwtService: JwtService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UserRepository,
                    useValue: {
                        findUnique: jest.fn().mockReturnValue(user),
                        create: jest.fn().mockReturnValue(user)
                    }
                },
                JwtService,
                {
                    provide: JwtService,
                    useValue: {
                        signAsync: jest.fn().mockResolvedValue(accessToken.access_token)
                    }
                }
            ]
        }).compile()

        authService = module.get<AuthService>(AuthService)
        userRepository = module.get<UserRepository>(UserRepository)
        jwtService = module.get<JwtService>(JwtService)
    })

    it("should be defined", () => {
        expect(authService).toBeDefined()
        expect(userRepository).toBeDefined()
    })

    describe("signup", () => {
        it("should return a JWT token to user", async () => {
            // Arrange
            jest.spyOn(userRepository, 'findUnique').mockResolvedValueOnce(null)
            // Act
            const result = await authService.signup(signupDto)
            // Assert
            expect(result).toEqual(accessToken)
            expect(userRepository.findUnique).toHaveBeenCalledTimes(1)
            expect(userRepository.create).toHaveBeenCalledTimes(1)
            expect(jwtService.signAsync).toHaveBeenCalledTimes(1)
            
        })

        it("should throw an exeption", () => {
            // Arrange
            jest.spyOn(authService, 'signup').mockRejectedValueOnce(new Error())
            // Assert
            expect(authService.signup(signupDto)).rejects.toThrow()
        })
    })

    describe("signin", () => {
        it("should return a JWT token to user", async () => {
            // Act
            const restult = await authService.signin(signinDto)
            // Assert
            expect(restult).toEqual(accessToken)
            expect(userRepository.findUnique).toHaveBeenCalledTimes(1)
            expect(jwtService.signAsync).toHaveBeenCalledTimes(1)
        })

        it("should throw an exception", () => {
            // Arrange
            jest.spyOn(authService, 'signin').mockRejectedValueOnce(new Error())
            // Act
            expect(authService.signin(signinDto)).rejects.toThrow()
        })
    })
})