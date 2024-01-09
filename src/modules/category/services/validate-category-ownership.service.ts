import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from '../../../shared/repositories/category.repository';

@Injectable()
export class ValidateCategoryOwnershipService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async validate(userId: string, categoryId: string) {
    const isOwner = await this.categoryRepository.findFirst({
      where: { id: categoryId, userId }
    })

    if (!isOwner) {
      throw new NotFoundException("category not found")
    }

    return isOwner
  }
}
