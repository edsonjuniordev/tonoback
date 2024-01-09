import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './services/account.service';
import { CreateAccountDto } from './dto/create-account.dto';

const user = {
  id: "e40e5a88-d12f-49fb-afeb-60e373f394a3",
  email: "ed@email.com",
  password: "$2a$12$uR09n2ZL/4HRRJLmPRWpEerUdGnjnD32//AHyWY5tQqoMaUxXsIMW",
  name: "Ed",
  social_login: false,
  createdAt: "2023-11-15T23:20:11.476Z",
  updatedAt: "2023-11-15T23:20:11.476Z",
}

const createAccountDto = new CreateAccountDto({
  name: "XP Investimentos",
  balance: 100
})

const account = {
  id: "e40e5a88-d12f-49fb-afeb-60e373f394a4",
  userId: "e40e5a88-d12f-49fb-afeb-60e373f394a3",
  name: "XP Investimentos",
  balance: 100,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

const accountUpdated = {
  id: "e40e5a88-d12f-49fb-afeb-60e373f394a4",
  userId: "e40e5a88-d12f-49fb-afeb-60e373f394a3",
  name: "XP Investimentos",
  balance: 200,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

describe('AccountController', () => {
  let accountController: AccountController;
  let accountService: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: AccountService,
          useValue: {
            create: jest.fn().mockResolvedValue(account),
            findAllByUserId: jest.fn().mockResolvedValue([account]),
            update: jest.fn().mockResolvedValue(accountUpdated),
            delete: jest.fn().mockResolvedValue(null),
          }
        }
      ],
    }).compile();

    accountController = module.get<AccountController>(AccountController);
    accountService = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(accountController).toBeDefined();
    expect(accountService).toBeDefined();
  });

  describe("create", () => {
    it("should create an user account", async () => {
      // Act
      const result = await accountController.create(user.id, createAccountDto)
      // Assert
      expect(result).toEqual(account)
      expect(accountService.create).toHaveBeenCalledTimes(1)
    })

    it("should throw an axception", () => {
      // Setup
      jest.spyOn(accountService, "create").mockRejectedValueOnce(new Error())
      // Assert
      expect(accountController.create(user.id, createAccountDto)).rejects.toThrow()
    })
  })

  describe("findAll", () => {
    it("should return all accounts from a user", async () => {
      // Act
      const result = await accountController.findAll(user.id)
      // Assert
      expect(result).toEqual([account])
      expect(accountService.findAllByUserId).toHaveBeenCalledTimes(1)
    })

    it("should throw an exception", () => {
      // Setup
      jest.spyOn(accountService, "findAllByUserId").mockRejectedValueOnce(new Error())
      // Assert
      expect(accountController.findAll(user.id)).rejects.toThrow()
    })
  })

  describe("update", () => {
    it("should return a account updated", async () => {
      // Setup
      account.balance = 200
      // Act
      const result = await accountController.update(user.id, account.id, account)
      // Assert
      expect(result).toEqual(accountUpdated)
      expect(accountService.update).toHaveBeenCalledTimes(1)
    })

    it("should throw an exception", () => {
      // Setup
      jest.spyOn(accountService, "update").mockRejectedValueOnce(new Error())
      // Assert
      expect(accountController.update(user.id, account.id, account)).rejects.toThrow()
    })
  })

  describe("delete", () => {
    it("should delete an user", async () => {
      // Act
      const result = await accountController.delete(user.id, account.id)
      // Assert
      expect(result).toBeNull()
      expect(accountService.delete).toHaveBeenCalledTimes(1)
    })

    it("should throw an exception", () => {
      // Setup
      jest.spyOn(accountService, "delete").mockRejectedValueOnce(new Error())
      // Assert
      expect(accountController.delete(user.id, account.id)).rejects.toThrow()
    })
  })
});
