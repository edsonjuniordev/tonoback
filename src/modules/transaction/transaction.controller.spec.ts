import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

const user = {
  id: "e40e5a88-d12f-49fb-afeb-60e373f394a3",
  email: "ed@email.com",
  password: "$2a$12$uR09n2ZL/4HRRJLmPRWpEerUdGnjnD32//AHyWY5tQqoMaUxXsIMW",
  name: "Ed",
  social_login: false,
  createdAt: "2023-11-15T23:20:11.476Z",
  updatedAt: "2023-11-15T23:20:11.476Z",
}

const createTransactionDto = new CreateTransactionDto({
  accountId: "e40e5a88-d12f-49fb-afeb-60e373f394a4",
  categoryId: "e40e5a88-d12f-49fb-afeb-60e373f394a5",
  type: "deposit",
  description: "Deposito",
  value: 100
})

const transaction = {
  id: "d1982b14-e7b0-427f-8447-47d396b332ea",
  userId: "e40e5a88-d12f-49fb-afeb-60e373f394a3",
  accountId: "e904ebad-d348-4047-ae1f-3edb25bbac4d",
  categoryId: "c0b3fd97-f714-4fa8-90e8-3d624d9328c6",
  type: "in",
  description: "Cashout",
  value: 10,
  createdAt: "2023-11-30T19:44:10.092Z"
}

describe('TransactionController', () => {
  let transactionController: TransactionController;
  let transactionService: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: TransactionService,
          useValue: {
            create: jest.fn().mockResolvedValue(createTransactionDto),
            findAllByUserId: jest.fn().mockResolvedValue([transaction]),
            findOneByIdAndUserId: jest.fn().mockResolvedValue(transaction),
          }
        }
      ],
    }).compile();

    transactionController = module.get<TransactionController>(TransactionController);
    transactionService = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(transactionController).toBeDefined();
  });

  describe("create", () => {
    it("should create a transaction", async () => {
      // Act
      const result = await transactionController.create(user.id, createTransactionDto);
      // Assert
      expect(result).toEqual(createTransactionDto);
      expect(transactionService.create).toHaveBeenCalledTimes(1);
    })

    it("should throw an exception", () => {
      // Setup
      jest.spyOn(transactionService, "create").mockRejectedValueOnce(new Error());
      // Act
      expect(transactionController.create(user.id, createTransactionDto)).rejects.toThrow();
    })
  })

  describe("findAll", () => {
    it("should find all user transactions", async () => {
      // Act
      const result = await transactionController.findAll(user.id);
      // Assert
      expect(result).toEqual([transaction]);
      expect(transactionService.findAllByUserId).toHaveBeenCalledTimes(1);
    })
  })

  describe("findOne", () => {
    it("should find one transaction by user id", async () => {
      // Act
      const result = await transactionController.findOne(user.id, transaction.id);
      // Assert
      expect(result).toEqual(transaction);
      expect(transactionService.findOneByIdAndUserId).toHaveBeenCalledTimes(1);
    })

    it("should throw an exception", () => {
      // Setup
      jest.spyOn(transactionService, "findOneByIdAndUserId").mockRejectedValueOnce(new Error());
      // Act
      expect(transactionController.findOne(user.id, transaction.id)).rejects.toThrow();
    })
  })
});
