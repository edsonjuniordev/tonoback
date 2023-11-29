import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
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
  name: "XP Investimentos",
  balance: 100
})

const account = {
  id: "123",
  userId: "123",
  name: "XP Investimentos",
  balance: 100,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

describe('AccountController', () => {
  let accountController: AccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: AccountService,
          useValue: {
            create: jest.fn().mockResolvedValue(account),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          }
        }
      ],
    }).compile();

    accountController = module.get<AccountController>(AccountController);
  });

  it('should be defined', () => {
    expect(accountController).toBeDefined();
  });

  describe("create", () => {
    it("should create an user account", async () => {
      // Act
      const result = await accountController.create(user.id, createAccountDto)
      // Assert
      expect(result).toEqual(account)
    })
  })
});
