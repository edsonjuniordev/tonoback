import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './services/category.service';
import { CategoryRepository } from '../../shared/repositories/category.repository';
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

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let categoryRepository: CategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: CategoryRepository,
          useValue: {
            create: jest.fn().mockReturnValue(createCategoryDto),
            findMany: jest.fn().mockReturnValue([createCategoryDto])
          }
        }
      ],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<CategoryRepository>(CategoryRepository);
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
  });

  describe("create", () => {
    it("should create a new category", async () => {
      // Act
      const result = await categoryService.create(user.id, createCategoryDto);
      // Assert
      expect(result).toEqual(createCategoryDto);
      expect(categoryRepository.create).toHaveBeenCalledTimes(1);
    })

    it("should throw an exception", () => {
      // Setup
      jest.spyOn(categoryRepository, "create").mockRejectedValueOnce(new Error());
      // Act
      expect(categoryService.create(user.id, createCategoryDto)).rejects.toThrow();
    })
  })

  describe("findAllByUserId", () => {
    it("should return all categories from a user", async () => {
      // Act
      const result = await categoryService.findAllByUserId(user.id);
      // Assert
      expect(result).toEqual([createCategoryDto]);
      expect(categoryRepository.findMany).toHaveBeenCalledTimes(1);
    })

    it("should throw an exception", () => {
      // Setup
      jest.spyOn(categoryRepository, "findMany").mockRejectedValueOnce(new Error());
      // Act
      expect(categoryService.findAllByUserId(user.id)).rejects.toThrow();
    })
  })
});
