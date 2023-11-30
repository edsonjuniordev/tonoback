import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRepository } from '../../shared/repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) { }
  create(userId: string, createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto
    return this.categoryRepository.create({
      data: {
        name,
        userId
      }
    });
  }

  findAllByUserId(userId: string) {
    return this.categoryRepository.findMany({
      where: {
        userId
      }
    });
  }
}
