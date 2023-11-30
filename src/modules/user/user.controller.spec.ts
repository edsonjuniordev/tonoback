import { Test, TestingModule } from "@nestjs/testing"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"

const user = {
    id: "e40e5a88-d12f-49fb-afeb-60e373f394a3",
    email: "ed@email.com",
    password: "$2a$12$uR09n2ZL/4HRRJLmPRWpEerUdGnjnD32//AHyWY5tQqoMaUxXsIMW",
    name: "Ed",
    social_login: false,
    created_at: "2023-11-15T23:20:11.476Z",
    updated_at: "2023-11-15T23:20:11.476Z",
}

describe("UserController", () => {
    let userController: UserController
    let userService: UserService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserController,
                {
                    provide: UserService,
                    useValue: {
                        getUserById: jest.fn().mockResolvedValue(user)
                    }
                }
            ]
        }).compile()

        userController = module.get<UserController>(UserController)
        userService = module.get<UserService>(UserService)
    })

    it("sould be defined", () => {
        expect(userController).toBeDefined()
    })

    describe("me", () => {
        it("should return a user data", async () => {
            // Act
            const result = await userController.me(user.id)
            // Assert
            expect(result).toEqual(user)
            expect(userService.getUserById).toHaveBeenCalledTimes(1)
        })

        it("should throw an exception", () => {
            // Setup
            jest.spyOn(userService, "getUserById").mockRejectedValueOnce(new Error())
            // Act
            expect(userController.me(user.id)).rejects.toThrow()
        })
    })

})