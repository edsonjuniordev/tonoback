import { AccountType } from "@application/domain/entities/account.entity"
import { AccountRepository } from "@application/repository/account.repository"
import { CreateAccountBuildDto, CreateAccountInputDto } from "@application/use-cases/account/create-account/create-account.dto"
import { CreateAccountUseCase } from "@application/use-cases/account/create-account/create-account.use-case"
import { UUIDGenerator } from "@package/uuid-generator"

describe("create-account use-case", () => {
  let inputMock: CreateAccountInputDto
  let buildMock: CreateAccountBuildDto

  let accountRepositoryMock: AccountRepository

  beforeEach(() => {
    inputMock = {
      userId: UUIDGenerator.generate(),
      balance: 0,
      color: "color",
      name: "name",
      type: AccountType.CASH
    }

    accountRepositoryMock = {
      create: jest.fn().mockResolvedValue(null),
      findByUserId: jest.fn().mockResolvedValue(null),
      findById: jest.fn().mockResolvedValue(null),
      update: jest.fn().mockResolvedValue(null),
      delete: jest.fn().mockResolvedValue(null)
    }

    buildMock = {
      accountRepository: accountRepositoryMock
    }
  })

  describe("build", () => {
    it("should return an instance of CreateAccountUseCase when passing valid dependencies", () => {
      const createAccountUseCase = CreateAccountUseCase.build(buildMock)

      expect(createAccountUseCase).toBeDefined()
      expect(createAccountUseCase).toBeInstanceOf(CreateAccountUseCase)
    })
  })

  describe("execute", () => {
    it("should return a CreateAccountOutputDto when passing a valid CreateAccountInputDto", async () => {
      const createAccountUseCase = CreateAccountUseCase.build(buildMock)

      const output = await createAccountUseCase.execute(inputMock)

      expect(output).toBeDefined()
      expect(accountRepositoryMock.create).toHaveBeenCalledTimes(1)
    })
  })
})