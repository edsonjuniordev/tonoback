import { UUIDGenerator } from "../../../package/uuid-generator"
import { Account, AccountType } from "../../domain/entities/account.entity"
import { AccountRepository } from "../../repository/account.repository"
import { DeleteAccountBuildDto, DeleteAccountInputDto, DeleteAccountOutputDto } from "../../use-cases/account/delete-account/delete-account.dto"
import { DeleteAccountUseCase } from "../../use-cases/account/delete-account/delete-account.use-case"

describe("delete-account use-case", () => {
  let inputMock: DeleteAccountInputDto
  let outputMock: DeleteAccountOutputDto
  let buildMock: DeleteAccountBuildDto
  let findByIdOutputMock: Account

  let accountRepositoryMock: AccountRepository

  beforeEach(() => {
    inputMock = {
      id: UUIDGenerator.generate()
    }

    outputMock = undefined;

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
    it("should return an instance of DeleteAccountUseCase when passing valid dependencies", () => {
      const deleteAccountUseCase = DeleteAccountUseCase.build(buildMock)

      expect(deleteAccountUseCase).toBeDefined();
      expect(deleteAccountUseCase).toBeInstanceOf(DeleteAccountUseCase)
    })
  })

  describe("execute", () => {
    it("should return a DeleteAccountOutputDto when passing a valid DeleteAccountInputDto", async () => {
      const deleteAccountUseCase = DeleteAccountUseCase.build(buildMock)

      const output = await deleteAccountUseCase.execute(inputMock);

      expect(output).toEqual(outputMock)
      expect(accountRepositoryMock.findById).toHaveBeenCalledTimes(1)
    })
  })
})