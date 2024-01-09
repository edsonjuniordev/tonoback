import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './services/category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

const user = {
  id: "e40e5a88-d12f-49fb-afeb-60e373f394a3",
  email: "ed@email.com",
  password: "$2a$12$uR09n2ZL/4HRRJLmPRWpEerUdGnjnD32//AHyWY5tQqoMaUxXsIMW",
  name: "Ed",
  social_login: false,
  createdAt: "2023-11-15T23:20:11.476Z",
  updatedAt: "2023-11-15T23:20:11.476Z",
}

const createCategoryDto = new CreateCategoryDto({
  name: "Mercado"
})

describe('CategoryController', () => {
  let categoryController: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            create: jest.fn().mockResolvedValue(createCategoryDto),
            findAllByUserId: jest.fn().mockResolvedValue([createCategoryDto]),
          },
        }
      ],
    }).compile();

    categoryController = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(categoryController).toBeDefined();
  });

  describe("create", () => {
    it("should create a new category", async () => {
      // Act
      const result = await categoryController.create(user.id, createCategoryDto);
      // Assert
      expect(result).toEqual(createCategoryDto);
      expect(categoryService.create).toHaveBeenCalledTimes(1);
    });

    it("should throw an exception", () => {
      // Setup
      jest.spyOn(categoryService, "create").mockRejectedValueOnce(new Error());
      // Act
      expect(categoryController.create(user.id, createCategoryDto)).rejects.toThrow();
    })
  })

  describe("findAll", () => {
    it("should find all categories by user id", async () => {
      // Act
      const result = await categoryController.findAll(user.id);
      // Assert
      expect(result).toEqual([createCategoryDto]);
      expect(categoryService.findAllByUserId).toHaveBeenCalledTimes(1);
    });

    it("should throw an exception", () => {
      // Setup
      jest.spyOn(categoryService, "findAllByUserId").mockRejectedValueOnce(new Error());
      // Act
      expect(categoryController.findAll(user.id)).rejects.toThrow();
    })
  })
});
