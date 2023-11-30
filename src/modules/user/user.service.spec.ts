import { Test, TestingModule } from "@nestjs/testing"
import { UserService } from "./user.service"
import { UserRepository } from "../../shared/repositories/user.repository"

const user = {
    id: "e40e5a88-d12f-49fb-afeb-60e373f394a3",
    email: "ed@email.com",
    password: "$2a$12$uR09n2ZL/4HRRJLmPRWpEerUdGnjnD32//AHyWY5tQqoMaUxXsIMW",
    name: "Ed",
    social_login: false,
    created_at: "2023-11-15T23:20:11.476Z",
    updated_at: "2023-11-15T23:20:11.476Z",
}

describe("UserService", () => {
    let userService: UserService
    let userRepository: UserRepository

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: UserRepository,
                    useValue: {
                        findUnique: jest.fn().mockResolvedValue(user)
                    }
                }
            ]
        }).compile()

        userService = module.get<UserService>(UserService)
        userRepository = module.get<UserRepository>(UserRepository)
    })

    it("should be defined", () => {
        expect(userService).toBeDefined()
        expect(userRepository).toBeDefined()
    })

    describe("getUserById", () => {
        it("should return an user data", async () => {
            // Act
            const result = await userService.getUserById(user.id)
            // Assert
            expect(result).toEqual(user)
            expect(userRepository.findUnique).toHaveBeenCalledTimes(1)
        })

        it("should throw an exception", () => {
            // Setup
            jest.spyOn(userRepository, "findUnique").mockRejectedValueOnce(new Error)
            // Assert
            expect(userService.getUserById(user.id)).rejects.toThrow()
        })
    })
})