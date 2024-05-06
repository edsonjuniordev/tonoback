import { UUIDGenerator } from "@package/uuid-generator"
import { Account, AccountType } from "@application/domain/entities/account.entity"
import { AccountRepository } from "@application/repository/account.repository"
import { UpdateAccountBuildDto, UpdateAccountInputDto } from "@application/use-cases/account/update-account/update-account.dto"
import { UpdateAccountUseCase } from "@application/use-cases/account/update-account/update-account.use-case"

describe("update-account use-case", () => {
  let inputMock: UpdateAccountInputDto
  let buildMock: UpdateAccountBuildDto
  let findByIdOutputMock: Account

  let accountRepositoryMock: AccountRepository

  beforeEach(() => {
    inputMock = {
      id: UUIDGenerator.generate(),
      balance: 0,
      color: "color",
      name: "name",
      type: AccountType.CASH
    }

    findByIdOutputMock = Account.with({
      id: inputMock.id,
      userId: UUIDGenerator.generate(),
      balance: 0,
      color: "color",
      name: "name",
      type: AccountType.CASH,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    accountRepositoryMock = {
      create: jest.fn().mockResolvedValue(null),
      findByUserId: jest.fn().mockResolvedValue(null),
      findById: jest.fn().mockResolvedValue(findByIdOutputMock),
      update: jest.fn().mockResolvedValue(null),
      delete: jest.fn().mockResolvedValue(null)
    }

    buildMock = {
      accountRepository: accountRepositoryMock
    }
  })

  describe("build", () => {
    it("should return an instance of UpdateAccountUseCase when passing valid dependencies", () => {
      const updateAccountUseCase = UpdateAccountUseCase.build(buildMock)

      expect(updateAccountUseCase).toBeDefined()
      expect(updateAccountUseCase).toBeInstanceOf(UpdateAccountUseCase)
    })
  })

  describe("execute", () => {
    it("should return a UpdateAccountOutputDto when passing a valid UpdateAccountInputDto", async () => {
      const updateAccountUseCase = UpdateAccountUseCase.build(buildMock)

      const output = await updateAccountUseCase.execute(inputMock)

      expect(output).toBeDefined()
      expect(accountRepositoryMock.findById).toHaveBeenCalledTimes(1)
      expect(accountRepositoryMock.update).toHaveBeenCalledTimes(1)
    })
  })
})