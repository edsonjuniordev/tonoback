import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './services/transaction.service';
import { TransactionRepository } from '../../shared/repositories/transaction.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AccountRepository } from '../../shared/repositories/account.repository';
import { CategoryRepository } from '../../shared/repositories/category.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TransactionType } from './entities/transaction';

const user = {
  id: "e40e5a88-d12f-49fb-afeb-60e373f394a3",
  email: "ed@email.com",
  password: "$2a$12$uR09n2ZL/4HRRJLmPRWpEerUdGnjnD32//AHyWY5tQqoMaUxXsIMW",
  name: "Ed",
  social_login: false,
  createdAt: "2023-11-15T23:20:11.476Z",
  updatedAt: "2023-11-15T23:20:11.476Z",
}

const account = {
  id: "e40e5a88-d12f-49fb-afeb-60e373f394a4",
  userId: "e40e5a88-d12f-49fb-afeb-60e373f394a3",
  name: "XP Investimentos",
  balance: 100,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

const category = {
  id: "e40e5a88-d12f-49fb-afeb-60e373f394a4",
  userId: "e40e5a88-d12f-49fb-afeb-60e373f394a3",
  name: "Mercado"
}

const createTransactionDto = new CreateTransactionDto({
  accountId: "e40e5a88-d12f-49fb-afeb-60e373f394a4",
  categoryId: "e40e5a88-d12f-49fb-afeb-60e373f394a5",
  description: "Deposito",
  transactionDate: new Date().toISOString(),
  type: TransactionType.IN,
  value: 100
})

const transaction = {
  id: "d1982b14-e7b0-427f-8447-47d396b332ea",
  userId: "e40e5a88-d12f-49fb-afeb-60e373f394a3",
  accountId: "e904ebad-d348-4047-ae1f-3edb25bbac4d",
  categoryId: "c0b3fd97-f714-4fa8-90e8-3d624d9328c6",
  type: "in",
  description: "Cashin",
  value: 10,
  createdAt: "2023-11-30T19:44:10.092Z"
}

describe('TransactionService', () => {
  let transactionService: TransactionService;
  let transactionRepository: TransactionRepository;
  let accountRepository: AccountRepository;
  let categoryRepository: CategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: TransactionRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(createTransactionDto),
            findMany: jest.fn().mockResolvedValue([transaction]),
            findUnique: jest.fn().mockResolvedValue(transaction)
          },
        },
        {
          provide: AccountRepository,
          useValue: {
            findUnique: jest.fn().mockResolvedValue(account),
            update: jest.fn().mockResolvedValue(account),
          }
        },
        {
          provide: CategoryRepository,
          useValue: {
            findUnique: jest.fn().mockResolvedValue(category)
          }
        }
      ],
    }).compile();

    transactionService = module.get<TransactionService>(TransactionService);
    transactionRepository = module.get<TransactionRepository>(TransactionRepository);
    accountRepository = module.get<AccountRepository>(AccountRepository);
    categoryRepository = module.get<CategoryRepository>(CategoryRepository);
  });

  it('should be defined', () => {
    expect(transactionService).toBeDefined();
  });

  describe("create", () => {
    it("should create a new transaction", async () => {
      // Act
      const result = await transactionService.create(user.id, createTransactionDto);
      // Assert
      expect(result).toEqual(createTransactionDto);
      expect(accountRepository.findUnique).toHaveBeenCalledTimes(1)
      expect(categoryRepository.findUnique).toHaveBeenCalledTimes(1)
      expect(transactionRepository.create).toHaveBeenCalledTimes(1);
    })

    it("should throw an account not found exception", () => {
      // Setup
      const notFoundException = new NotFoundException("account not found")
      jest.spyOn(accountRepository, "findUnique").mockResolvedValueOnce(null);
      // Assert
      expect(transactionService.create(user.id, createTransactionDto)).rejects.toEqual(notFoundException)
    })

    it("should throw a category not found exception", () => {
      // Setup
      const notFoundException = new NotFoundException("category not found")
      jest.spyOn(categoryRepository, "findUnique").mockResolvedValueOnce(null);
      // Assert
      expect(transactionService.create(user.id, createTransactionDto)).rejects.toEqual(notFoundException)
    })

    it("should throw a insuficient balance bad request exception", () => {
      // Setup
      createTransactionDto.value = 150
      const badRequestException = new BadRequestException("insuficient balance")
      // Assert
      expect(transactionService.create(user.id, createTransactionDto)).rejects.toEqual(badRequestException)
      createTransactionDto.value = 100
    })

    it("should throw a transaction not created exception", () => {
      // Setup
      const notCreatedException = new BadRequestException("transaction not created")
      jest.spyOn(transactionRepository, "create").mockResolvedValueOnce(null);
      // Assert
      expect(transactionService.create(user.id, createTransactionDto)).rejects.toEqual(notCreatedException)
    })

    it("should throw an exception", () => {
      // Setup
      jest.spyOn(accountRepository, "findUnique").mockRejectedValueOnce(new Error());
      // Assert
      expect(transactionService.create(user.id, createTransactionDto)).rejects.toThrow();
    })
  })

  describe("findAllByUserId", () => {
    it("should return all user transactions", async () => {
      // Act
      const result = await transactionService.findAllByUserId(user.id);
      // Assert
      expect(result).toEqual([transaction]);
      expect(transactionRepository.findMany).toHaveBeenCalledTimes(1);
    })

    it("should throw an exception", () => {
      // Setup
      jest.spyOn(transactionRepository, "findMany").mockRejectedValueOnce(new Error());
      // Assert
      expect(transactionService.findAllByUserId(user.id)).rejects.toThrow();
    })
  })

  describe("findOneByIdAndUserId", () => {
    it("should return a user transaction", async () => {
      // Act
      const result = await transactionService.findOneByIdAndUserId(transaction.id, user.id);
      // Assert
      expect(result).toEqual(transaction);
      expect(transactionRepository.findUnique).toHaveBeenCalledTimes(1);
    })

    it("should throw a transaction not found exception", () => {
      // Setup
      const notFoundException = new NotFoundException("transaction not found")
      jest.spyOn(transactionRepository, "findUnique").mockResolvedValueOnce(null);
      // Assert
      expect(transactionService.findOneByIdAndUserId(transaction.id, user.id)).rejects.toEqual(notFoundException)
    })

    it("should throw an exception", () => {
      // Setup
      jest.spyOn(transactionRepository, "findUnique").mockRejectedValueOnce(new Error());
      // Assert
      expect(transactionService.findOneByIdAndUserId(transaction.id, user.id)).rejects.toThrow();
    })
  })
});
