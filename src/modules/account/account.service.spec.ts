import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { AccountRepository } from '../../shared/repositories/account.repository';
import { CreateAccountDto } from './dto/create-account.dto';

const user = {
  id: "e40e5a88-d12f-49fb-afeb-60e373f394a3",
  email: "ed@email.com",
  password: "$2a$12$uR09n2ZL/4HRRJLmPRWpEerUdGnjnD32//AHyWY5tQqoMaUxXsIMW",
  name: "Ed",
  social_login: false,
  created_at: "2023-11-15T23:20:11.476Z",
  updated_at: "2023-11-15T23:20:11.476Z",
}

const createAccountDto = new CreateAccountDto({
  name: "Account 1",
  balance: 100
})

const account = {
  id: "e40e5a88-d12f-49fb-afeb-60e373f394a4",
  userId: "e40e5a88-d12f-49fb-afeb-60e373f394a3",
  name: "XP Investimentos",
  balance: 100,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

const accountUpdated = {
  id: "e40e5a88-d12f-49fb-afeb-60e373f394a4",
  userId: "e40e5a88-d12f-49fb-afeb-60e373f394a3",
  name: "XP Investimentos",
  balance: 200,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

describe('AccountService', () => {
  let accountService: AccountService;
  let accountRepository: AccountRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: AccountRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(createAccountDto),
            findMany: jest.fn().mockResolvedValue([createAccountDto]),
            findFirst: jest.fn().mockResolvedValue(account),
            update: jest.fn().mockResolvedValue(accountUpdated),
            delete: jest.fn().mockResolvedValue(null),
          }
        }
      ],
    }).compile();

    accountService = module.get<AccountService>(AccountService);
    accountRepository = module.get<AccountRepository>(AccountRepository);
  });

  it('should be defined', () => {
    expect(accountService).toBeDefined();
  });

  describe("create", () => {
    it("should create a new account", async () => {
      // Act
      const result = await accountService.create(user.id, createAccountDto)
      // Assert
      expect(result).toEqual(createAccountDto)
      expect(accountRepository.create).toHaveBeenCalledTimes(1);
    })

    it("should throw an error", () => {
      // Setup
      jest.spyOn(accountRepository, "create").mockRejectedValueOnce(new Error());
      // Assert
      expect(accountService.create(user.id, createAccountDto)).rejects.toThrow();
    })
  })

  describe("findAllByUserId", () => {
    it("should find all accounts by user id", async () => {
      // Act
      const result = await accountService.findAllByUserId(user.id)
      // Assert
      expect(result).toEqual([createAccountDto])
      expect(accountRepository.findMany).toHaveBeenCalledTimes(1);
    })

    it("should throw an error", () => {
      // Setup
      jest.spyOn(accountRepository, "findMany").mockRejectedValueOnce(new Error());
      // Assert
      expect(accountService.findAllByUserId(user.id)).rejects.toThrow();
    })
  })

  describe("update", () => {
    it("should update an account", async () => {
      // Setup
      account.balance = 200
      // Act
      const result = await accountService.update(account.id, user.id, account)
      // Assert
      expect(result).toEqual(accountUpdated)
      expect(accountRepository.update).toHaveBeenCalledTimes(1);
    })

    it("should throw an error", () => {
      // Setup
      jest.spyOn(accountRepository, "update").mockRejectedValueOnce(new Error());
      // Assert
      expect(accountService.update(account.id, user.id, account)).rejects.toThrow();
    })
  })

  describe("delete", () => {
    it("should delete an account", async () => {
      // Act
      const result = await accountService.delete(account.id, user.id)
      // Assert
      expect(result).toBeNull()
      expect(accountRepository.delete).toHaveBeenCalledTimes(1);
    })

    it("should throw an error", () => {
      // Setup
      jest.spyOn(accountRepository, "delete").mockRejectedValueOnce(new Error());
      // Assert
      expect(accountService.delete(account.id, user.id)).rejects.toThrow();
    })
  })
});
