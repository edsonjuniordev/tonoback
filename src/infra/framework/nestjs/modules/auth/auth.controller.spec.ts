import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from "./auth.controller"
import { AuthService } from './auth.service'
import { SignupDto } from './dto/signup.dto'
import { SigninDto } from './dto/signin.dto'

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

describe("AuthController", () => {
    let authController: AuthController
    let authService: AuthService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        signin: jest.fn().mockResolvedValue(accessToken),
                        signup: jest.fn().mockResolvedValue(accessToken)
                    }
                }
            ]
        }).compile()

        authController = module.get<AuthController>(AuthController)
        authService = module.get<AuthService>(AuthService)
    })

    it("should be defined", () => {
        expect(authController).toBeDefined()
        expect(authService).toBeDefined()
    })

    describe("signup", () => {
        it("should return a JWT token to user", async () => {
            // Act
            const result = await authController.signup(signupDto)
            // Assert
            expect(result).toEqual(accessToken)
            expect(authService.signup).toHaveBeenCalledTimes(1)
        })

        it("should throw an exception", () => {
            // Setup
            jest.spyOn(authService, 'signup').mockRejectedValueOnce(new Error())
            // Assert
            expect(authController.signup(signupDto)).rejects.toThrow()
        })
    })

    describe("signin", () => {
        it("should return a JWT token to user", async () => {
            // Act
            const result = await authController.signin(signinDto)
            // Assert
            expect(result).toEqual(accessToken)
            expect(authService.signin).toHaveBeenCalledTimes(1)
        })

        it("should throw an exception", () => {
            // Setup
            jest.spyOn(authService, "signin").mockRejectedValueOnce(new Error())
            //Assert
            expect(authController.signin(signinDto)).rejects.toThrow()
        })
    })
})