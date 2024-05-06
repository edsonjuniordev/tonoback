import { AccountRepository } from "@application/repository/account.repository"
import { GetUserAccountsBuildDto, GetUserAccountsInputDto, GetUserAccountsOutputDto } from "@application/use-cases/account/get-user-accounts/get-user-accounts.dto"
import { GetUserAccountsUseCase } from "@application/use-cases/account/get-user-accounts/get-user-accounts.use-case"
import { UUIDGenerator } from "@package/uuid-generator"
import { Account, AccountType } from "@application/domain/entities/account.entity"

describe("get-user-accounts use-case", () => {
  let inputMock: GetUserAccountsInputDto
  let outputMock: GetUserAccountsOutputDto
  let findByUserIdOutput: Account[]
  let buildMock: GetUserAccountsBuildDto

  let accountRepositoryMock: AccountRepository

  beforeEach(() => {
    inputMock = {
      userId: UUIDGenerator.generate()
    }

    findByUserIdOutput = [
      Account.create({
        userId: UUIDGenerator.generate(),
        balance: 0,
        color: "color",
        name: "name",
        type: AccountType.CASH
      })
    ]

    outputMock = [
      {
        id: findByUserIdOutput[0].id,
        userId: findByUserIdOutput[0].userId,
        balance: findByUserIdOutput[0].balance,
        color: findByUserIdOutput[0].color,
        name: findByUserIdOutput[0].name,
        type: findByUserIdOutput[0].type,
        createdAt: findByUserIdOutput[0].createdAt,
        updatedAt: findByUserIdOutput[0].updatedAt
      }
    ]

    accountRepositoryMock = {
      create: jest.fn().mockResolvedValue(null),
      findByUserId: jest.fn().mockResolvedValue(findByUserIdOutput),
      findById: jest.fn().mockResolvedValue(null),
      update: jest.fn().mockResolvedValue(null),
      delete: jest.fn().mockResolvedValue(null)
    }

    buildMock = {
      accountRepository: accountRepositoryMock
    }
  })

  describe("build", () => {
    it("should return an instance of GetUserAccountsUseCase when passing valid dependencies", () => {
      const getUserAccountsUseCase = GetUserAccountsUseCase.build(buildMock)

      expect(getUserAccountsUseCase).toBeDefined();
      expect(getUserAccountsUseCase).toBeInstanceOf(GetUserAccountsUseCase);
    })
  })

  describe("execute", () => {
    it("should return a GetUserAccountsOutputDto when passing a valid GetUserAccountsInputDto", async () => {
      const getUserAccountsUseCase = GetUserAccountsUseCase.build(buildMock)

      const output = await getUserAccountsUseCase.execute(inputMock)
  
      expect(output).toBeDefined();
      expect(output).toEqual(outputMock)
      expect(accountRepositoryMock.findByUserId).toHaveBeenCalledTimes(1)
    })
  })
})